
export const ACITON_CREATED    = 'created'       /* 缓存创建 */
export const ACTION_ACTIVE     = 'active'        /* 缓存激活 */
export const ACTION_ACTIVED    = 'actived'       /* 激活完成 */
export const ACITON_UNACTIVE   = 'unActive'      /* 缓存休眠 */
export const ACTION_UNACTIVED  = 'unActived'     /* 休眠完成 */
export const ACTION_DESTORY    = 'destory'       /* 设置摧毁状态 */
export const ACTION_DESTORYED  = 'destoryed'     /* 摧毁缓存 */
export const ACTION_CLEAR      = 'clear'        /* 清除缓存 */
export const ACTION_UPDATE     = 'update'        /* 更新组件 */

export const KEEPALIVE_ID = '__keepalive__'

/**
 * 数据类型校验
 * @param type 待校验类型
 */
export function isType(type) {
    return Object.prototype.toString.call(type).slice(8, -1)
}

/* 函数类型 */
export function isFuntion(type) {
    return isType(type) === 'Function'
}