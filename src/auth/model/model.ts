
/**
 * Model character
 * 
 */
export type character = {
    character_idx: number
    user_idx: number
    guild_idx: number | null
    name: string
    is_main_character: string | null
}

/**
 * Model common_bbs
 * 
 */
export type common_bbs = {
    bbs_idx: number
    bbs_name: string
    bbs_detail_code: string
    bbs_own_guild: number
    input_id: string
    input_dt: Date
    update_id: string | null
    update_dt: Date | null
    is_deleted: string | null
    delete_dt: Date | null
}

/**
 * Model common_bbs_article
 * 
 */
export type common_bbs_article = {
    article_idx: number
    bbs_idx: number
    article_code: string
    title: string
    content: string
    file_id: number | null
    input_id: string
    input_dt: Date
    update_id: string | null
    update_dt: Date | null
    is_deleted: string | null
    delete_dt: Date | null
}

/**
 * Model common_bbs_reply
 * 
 */
export type common_bbs_reply = {
    reply_idx: number
    article_idx: number
    upper_reply_idx: number | null
    content: string
    input_id: string
    input_dt: Date
    update_id: string | null
    update_dt: Date | null
    is_deleted: string | null
    delete_dt: Date | null
}

/**
 * Model common_code
 * 
 */
export type common_code = {
    detail_code_idx: number
    code_group_idx: number
    detail_code: string
    code_value: string
    input_id: string
    input_dt: Date
    update_id: string | null
    update_dt: Date | null
    is_used: string | null
}

/**
 * Model common_code_group
 * 
 */
export type common_code_group = {
    code_group_idx: number
    code_group_name: string
    input_id: string
    input_dt: Date
    update_id: string | null
    update_dt: Date | null
    is_used: string | null
}

/**
 * Model crawled_character
 * 
 */
export type crawled_character = {
    crawled_idx: number
    character_idx: number
    name: string
    server_code: string
    splty_code: string
    level: number
}

/**
 * Model guild
 * 
 */
export type guild = {
    guild_idx: number
    name: string
    guild_introduce: string | null
    guild_level: number | null
    guild_icon: number | null
}

/**
 * Model raid
 * 
 */
export type raid = {
    raid_idx: number
    guild_idx: number
    raid_dt: Date
    is_out_guild: string
    raid_introduce: string | null
    input_id: string | null
    input_dt: Date | null
    update_id: string | null
    update_dt: Date | null
}

/**
 * Model raid_apply
 * 
 */
export type raid_apply = {
    raid_apply_idx: number
    character_idx: number
    raid_idx: number
    input_id: string
    input_dt: Date
    upate_id: string | null
    update_dt: Date | null
    delete_id: string | null
    delete_dt: Date | null
    delete_claue: string | null
}

/**
 * Model raid_target
 * 
 */
export type raid_target = {
    raid_target_idx: number
    raid_idx: number
    ligion_code: string
    input_id: string
    input_dt: Date
    update_id: string | null
    update_dt: Date | null
}



/**
 * Model temp
 * 
 */
export type temp = {
    raid_target_idx: number
    input_id: string | null
    input_dt: Date | null
    update_id: string | null
    update_dt: Date | null
}

/**
 * Model user
 * 
 */
export type user = {
    user_idx: number
    user_name: string
    name: string
    password: string
    sex_dstn_code: string
    mobile_phone: string
    profile_img: number | null
}

/**
 * Model menu
 * 
 */
export type menu = {
    menu_idx: number
    menu_name: string
    order: number | null
    is_active: string
    input_id: string
    input_dt: Date
    update_id: string | null
    update_dt: Date | null
    menu_describe: string | null
}

/**
 * Model menu_detail
 * 
 */
export type menu_detail = {
    menu_detail_idx: number
    menu_idx: number
    menu_name: string
    order: number | null
    menu_href_url: string
    menu_describe: string | null
    is_active: string
    input_id: string
    input_dt: Date
    update_id: string | null
    update_dt: Date | null
}
