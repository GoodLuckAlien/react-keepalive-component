import React from 'react'

import {
    ACITON_CREATED,
    KEEPALIVE_ID,
    ACTION_ACTIVE,
    ACITON_UNACTIVE,
    ACTION_ACTIVED,
    ACTION_UNACTIVED,
    ACTION_DESTORY,
    ACTION_UPDATE
} from '../utils'


class Keepalive {
    constructor(setState, maxLimit) {
        this.setState = setState
        this.maxLimit = maxLimit
        this.cacheList = []
        this.kid = -1
    }
    cacheDispatch ({
        type,
        payload
    }) {
        this[type] && this[type](payload)
        type !== ACITON_CREATED && this.setState({})
    }
    getKid() {
        this.kid++
        return KEEPALIVE_ID + this.KID
    }
    hasAliveStatus (cacheId) {
        const index = this.cacheList.findIndex(item => item.cacheId === cacheId)
        if(index >=0 ) return this.cacheList[index].status
        return null
    }
    destoryItem(payload){
        const index = this.cacheList.findIndex(item => item.cacheId === payload)
        if(index === -1 ) return
        if(this.cacheList[index].status === ACTION_UNACTIVED ){
             this.cacheList.splice(index,1)
        }
    }
    [ACTION_UPDATE](payload){
        const { cacheId, children } = payload
        const index = this.cacheList.findIndex(item => item.cacheId === cacheId)
        if(index === -1 ) return
        this.cacheList[index].updater = {}
        this.cacheList[index].children = children
    }
    [ACITON_CREATED](payload) {
        const {
            children,
            load,
            cacheId
        } = payload
        const cacheItem = {
            cacheId: cacheId || this.getKid(),
            load,
            status: ACITON_CREATED,
            children,
            updater:{}
        }
        this.cacheList.push(cacheItem)
    }
    [ACTION_DESTORY](payload) {
        if (Array.isArray(payload)) {
             payload.forEach(this.destoryItem.bind(this))
        } else {
             this.destoryItem(payload)
        }
    }
    [ACTION_ACTIVE](payload){
        const { cacheId, load } = payload
        const index = this.cacheList.findIndex(item => item.cacheId === cacheId)
        if(index === -1 ) return
        this.cacheList[index].status = ACTION_ACTIVE
        this.cacheList[index].load = load
    }
}

[ACITON_UNACTIVE, ACTION_ACTIVED, ACTION_UNACTIVED].forEach(status => {
    Keepalive.prototype[status] = function (payload) {
        for (let i = 0; i < this.cacheList.length; i++) {
            if (this.cacheList[i].cacheId === payload) {
                this.cacheList[i].status = status
                break
            }
        }
    }
})

export default function useKeep(CACHE_MAX_DEFAULT_LIMIT) {
    const keeper = React.useRef()
    const [, setKeepItems] = React.useState([])
    if (!keeper.current) {
        keeper.current = new Keepalive(setKeepItems, CACHE_MAX_DEFAULT_LIMIT)
    }
    return keeper.current
}