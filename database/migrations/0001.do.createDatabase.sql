
-- We begin a transaction so that if any SQL statement fails, none of the
-- changes will be applied.
begin;

-- We want to cryptographically hash passwords, therefore create this
-- extension.
create extension if not exists pgcrypto;

-- Create the schema we are going to use.
create schema todos;

-- Create a schema to host the utilities for our schema. The reason it is in
-- another schema is so that it can be private.
create schema todos_utils;

-- By setting the `search_path`, whenever we create something in the default
-- namespace it is actually created in the `todos` schema.
--
-- For example, this lets us write `create table person …` instead of
-- `create table todos.person …`.
set search_path = todos, todos_utils, public;

-------------------------------------------------------------------------------
-- Public Tables

create type todoStatus as enum ('todo', 'doing', 'done');

create table todo (
  id                serial not null primary key,
  subject           varchar(64) not null,
  description       text,
  status            todoStatus,
  createdAt         timestamp,
  updatedAt         timestamp
);

comment on table todo is 'A todo item.';
comment on column todo.id is 'The primary key for the todo.';
comment on column todo.description is 'The todo’s description.';
comment on column todo.subject is 'The todo’s subject.';
comment on column todo.createdAt is 'The time this todo was created.';
comment on column todo.updatedAt is 'The latest time this todo was updated.';


create table todoTag (
  id              serial not null primary key,
  todoId          int not null references todo(id),
  tag             varchar(64) not null,
  createdAt       timestamp
);

comment on table todoTag is 'A tag that is attached to a todo.';
comment on column todoTag.id is 'The primary key for the todoTag.';
comment on column todoTag.todoId is 'The id of the todo this tag belongs to.';
comment on column todoTag.tag is 'The tag text.';
comment on column todoTag.createdAt is 'The time this tag was created.';

-------------------------------------------------------------------------------
-- Query Procedures
-------------------------------------------------------------------------------
-- Triggers

-- First we must define two utility functions, `set_createdAt` and
-- set_updatedAt` which we will use for our triggers.
--
-- Note that we also create them in `todos_utils` as we want them to be
-- private and not exposed by PostGraphQL.
--
-- Triggers taken initially from the Rust [Diesel][1] library, documentation
-- for `is distinct from` can be found [here][2].
--
-- [1]: https://github.com/diesel-rs/diesel/blob/1427b9f/diesel/src/pg/connection/setup/timestamp_helpers.sql
-- [2]: https://wiki.postgresql.org/wiki/Is_distinct_from

create function todos_utils.set_createdAt() returns trigger as $$
begin
  -- We will let the inserter manually set a `createdAt` time if they desire.
  if (new.createdAt is null) then
    new.createdAt := current_timestamp;
  end if;
  return new;
end;
$$ language plpgsql;

create function todos_utils.set_updatedAt() returns trigger as $$
begin
  new.updatedAt := current_timestamp;
  return new;
end;
$$ language plpgsql;

-- Next we must actually define our triggers for all tables that need them.
--
-- This is not a good example to copy if you are looking for a good way to
-- indent and style your trigger statements. They are all on one line to
-- conserve space :)

create trigger createdAt before insert on todo for each row execute procedure set_createdAt();
create trigger updatedAt before update on todo for each row execute procedure set_updatedAt();
create trigger createdAt before insert on todoTag for each row execute procedure set_createdAt();
create trigger updatedAt before update on todoTag for each row execute procedure set_updatedAt();

-------------------------------------------------------------------------------
-- Permissions

grant select on todo, todoTag to public;

-- Commit all the changes from this transaction. If any statement failed,
-- these statements will not have succeeded.
commit;


/*

insert into todo
select 0, 'my todo', 'do this thing', 'todo';

{
  todoNodes {
    nodes {
      rowId
      subject
      description
      updatedat
      createdat
    }
  }
}

{
  todoByRowId (rowId: 0) {
    id, subject, description, status, createdat, updatedat
  }
}

*/
