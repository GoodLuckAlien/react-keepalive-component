import React, {
    useContext,
    useRef,
    isValidElement,
    cloneElement,
    useEffect,
    useLayoutEffect
} from 'react'

import keepaliveContext from '../core/keepContext'
import {
    ACTION_UPDATE,
    ACITON_CREATED,
    isFuntion,
    ACTION_ACTIVE,
    ACITON_UNACTIVE,
    ACTION_UNACTIVED
} from '../utils'

export function useCacheDestory() {
    return useContext(keepaliveContext).cacheDestory
}

const renderWithChildren = (children) => (mergeProps) => {
    return children ?
        isFuntion(children) ?
        children(mergeProps) :
        isValidElement(children) ?
        cloneElement(children, mergeProps) :
        null :
        null
}

function KeepaliveItem({
    children,
    cacheId,
    style
}) {
    const {
        cacheDispatch,
        hasAliveStatus
    } = useContext(keepaliveContext)
    const first = useRef(false)
    const parentNode = useRef(null)
    const load = (currentNode) => {
        parentNode.current.appendChild(currentNode)
    }
    !first.current && !hasAliveStatus(cacheId) && cacheDispatch({
        type: ACITON_CREATED,
        payload: {
            load,
            cacheId,
            children: renderWithChildren(children)
        }
    })
    /* TODO: 自动生成 cacheId  */
    useLayoutEffect(() => {
        /* 触发更新逻辑 */
        hasAliveStatus(cacheId) !== ACTION_UNACTIVED && first.current && cacheDispatch({
            type: ACTION_UPDATE,
            payload: {
                cacheId,
                children: renderWithChildren(children)
            }
        })
    }, [children])
    useEffect(() => {
        first.current = true
        cacheDispatch({
            type: ACTION_ACTIVE,
            payload: {
                cacheId,
                load
            }
        })
        return function () {
            cacheDispatch({
                type: ACITON_UNACTIVE,
                payload: cacheId
            })
        }
    }, [])
    return <div ref={parentNode} style={style}/>
}

export default KeepaliveItem