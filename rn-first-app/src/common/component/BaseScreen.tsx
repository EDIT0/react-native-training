import type { JSX, ReactNode } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Edge = 'top' | 'bottom' | 'left' | 'right'

type Props = {
    children: ReactNode                 // 필수
    edges?: Array<Edge>                 // 선택
    style?: StyleProp<ViewStyle>        // 선택
}

export function BaseScreen(props: Props): JSX.Element {
    const children = props.children
    const style = props.style

    // edges를 안 넘기면 위/아래 여백을 기본으로 사용
    let edges: Array<Edge> = ['top', 'bottom']
    if (props.edges !== undefined) {
        edges = props.edges
    }

    const insets = useSafeAreaInsets()

    let paddingTop = 0
    if (edges.includes('top')) {
        paddingTop = insets.top
    }

    let paddingBottom = 0
    if (edges.includes('bottom')) {
        paddingBottom = insets.bottom
    }

    let paddingLeft = 0
    if (edges.includes('left')) {
        paddingLeft = insets.left
    }

    let paddingRight = 0
    if (edges.includes('right')) {
        paddingRight = insets.right
    }

    return (
        <View
        style={[
            {flex: 1, backgroundColor: '#ffffff'},                          // flex: 1 -> 화면 전체 채움
            {
                paddingTop: paddingTop,
                paddingBottom: paddingBottom,
                paddingLeft: paddingLeft,
                paddingRight: paddingRight,
            },
            style
        ]}>
            {children}
        </View>
    )
}
