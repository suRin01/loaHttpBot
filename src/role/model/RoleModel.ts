/**
 * Model role
 * 
 */
export type role = {
    role_idx: number
    name: string
    upper_role_idx: number | null
}

/**
 * Model role_relation
 * 
 */
export type role_relation = {
    role_relation_idx: number
    user_idx: number
    role_idx: number
}