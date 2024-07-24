import {integer, pgSchema, pgTable, serial, text, uuid} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";


const authSchema=pgSchema('auth');

const users=authSchema.table('users',{
    id:uuid('id').primaryKey(),
});

// export const accounts=pgTable('accounts',{
//     id:serial('id').primaryKey(),
//     email:text('email').notNull(),
//     password:text('password').notNull(),
//     user_id:uuid('user_id').references(()=>users.id,{onDelete:"cascade"}).notNull()
// })

export const pack=pgTable('pack',{
    id:serial('id').primaryKey(),
    PackTitle:text('pack_title').notNull(),
    thumbnail:text('thumbnail').notNull(),
    description:text('description').notNull(),
    userId:uuid("user_id").references(()=>users.id,{onDelete:"cascade"}).notNull()
})

export const packRelations=relations(pack,({many})=>({
    pack_video:many(pack_video)
}))

export const pack_video=pgTable("pack_video",{
    id:serial("id").primaryKey(),
    videoTitle:text("video_title").notNull(),
    description:text("description").notNull(),
    videoSrc:text('video_src').notNull(),
    packId:integer("packId").references(()=>pack.id,{onDelete:"cascade"}).notNull(),
})

export const pack_videoRelations=relations(pack_video,({one})=>({
    pack:one(pack,{
        fields:[pack_video.packId],
        references:[pack.id],
    }),
}))

export const videos=pgTable('videos',{
    id:serial('id').primaryKey(),
    videoTitle:text('video_title').notNull(),
    thumbnail:text('thumbnail'),
    videoSrc:text('video_src').notNull(),
    description:text('description'),
    packId:integer('packId').references(()=>pack.id),
    user_id:uuid('user_id').references(()=>users.id,{onDelete:"cascade"}).notNull()
})

export const note=pgTable('note',{
    id:serial('id').primaryKey(),
    title:text('title').notNull(),
    contents:text('contents').notNull()
})

