CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   username VARCHAR(50) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table tasks(
   id serial primary key,
   user_id integer not null,
   title varchar(255) not null,
   description text,
   is_completed boolean default false,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

create table tokens(
   user_id integer not null,
   token text,
   foreign key (user_id) references users(id) on delete cascade
);