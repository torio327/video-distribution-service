import {integer, pgSchema, pgTable, serial, text, uuid} from "drizzle-orm/pg-core";

const authSchema=pgSchema('auth');

const users=authSchema.table('users',{
    id:uuid('id').primaryKey(),
});

export const accounts=pgTable('accounts',{
    id:serial('id').primaryKey(),
    email:text('email').notNull(),
    password:text('password').notNull(),
    user_id:uuid('user_id').references(()=>users.id,{onDelete:"cascade"}).notNull()
})

export const pack=pgTable('pack',{
    id:serial('id').primaryKey(),
    PackTitle:text('pack_title').notNull(),
    thumbnail:text('thumbnail').notNull(),
    description:text('description').notNull()
})

export const videos=pgTable('videos',{
    id:serial('id').primaryKey(),
    videoTitle:text('video_title').notNull(),
    thumbnail:text('thumbnail'),
    videoSrc:text('video_src').notNull(),
    description:text('description'),
    packId:integer('packId').references(()=>pack.id),
    user_id:text('user_id').references(()=>users.id,{onDelete:"cascade"}).notNull()
})

export const note=pgTable('note',{
    id:serial('id').primaryKey(),
    title:text('title').notNull(),
    contents:text('contents').notNull()
})

