import { useNavigation } from "@react-navigation/native"
import type { JSX } from "react"
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { BaseScreen } from "../../../../common/component/BaseScreen"
import {
    useAppBackground,
    useAppForeground,
    useAppState,
    useBackHandler,
    useMount,
    useUnmount,
    useUpdateEffect,
} from "../../../../common/hooks/lifecycle"
import { consoleLog } from "../../../../common/util/LogUtil"
import { User } from "../../../../domain/model/User"
import { HomeViewModelEvent } from "../../event/HomeViewModelEvent"
import { HomeUiState } from "../../state/HomeUiState"
import { useHomeViewModel } from "../viewmodel/HomeViewModel"

/**
 * 홈 화면
 *
 * 화면 구성
 * - 오류       : HomeErrorView (화면 전체)
 * - 그 외      : HomeTitleView + HomeContentView
 *   - 로딩     : HomeLoadingView
 *   - 빈 목록  : HomeEmptyView
 *   - 목록     : HomeUserListView → HomeUserItemView
 */
export function HomeScreen(): JSX.Element {
    // 화면 이동용 (Kotlin: findNavController())
    const navigation = useNavigation()

    // SideEffectEvent 처리 (Kotlin: viewModel.sideEffectEvent.collect { when (it) { ... } })
    const homeViewModel = useHomeViewModel((event) => {
        switch (event.type) {
            case "ErrorDialog":
                Alert.alert("오류", event.message)
                break
            case "NavigateToAddUser":
                // TODO: 계정 추가 화면이 생기면 navigation.navigate(...)로 이동
                Alert.alert("알림", "계정 추가 화면은 준비 중입니다")
                break
            case "NavigateToPractice":
                navigation.navigate("Practice")
                break
        }
    })

    // Kotlin: viewModel.homeUiState.collect { }
    const homeUiState = homeViewModel.homeUiState

    // 현재 앱 상태 ('active' | 'background' | 'inactive')
    // 값이 바뀌면 화면이 다시 그려짐
    const appState = useAppState()

    // onCreate: 화면이 처음 나타날 때 1번
    useMount(() => {
        consoleLog("앱 첫 시작?")
        homeViewModel.handleViewModelEvent(HomeViewModelEvent.GetUsers())
    })

    // onDestroy: 화면이 사라질 때 1번
    useUnmount(() => {
        consoleLog("화면 종료")
    })

    // onResume: 다른 앱 갔다가 돌아왔을 때 (앱 처음 켤 때는 실행 안 됨)
    useAppForeground(() => {
        consoleLog("앱 복귀 (포그라운드)")
    })

    // onStop: 홈 버튼, 다른 앱으로 전환, 화면 꺼짐
    useAppBackground(() => {
        consoleLog("앱이 뒤로 감 (백그라운드)")
    })

    // appState 값이 바뀔 때마다 (처음 렌더링 때는 실행 안 됨)
    useUpdateEffect(() => {
        consoleLog("앱 상태 변경: " + appState)
    }, [appState])

    // onBackPressed: 뒤로가기 버튼/제스처
    useBackHandler(() => {
        consoleLog("뒤로가기 누름")
        return false // false = 평소처럼 뒤로가기 진행, true = 막기 (앱 안 닫힘)
    })

    // 오류: 화면 전체에 오류 화면
    if (homeUiState.isError) {
        return (
            <BaseScreen>
                <HomeErrorView
                    onClickRetry={() => {
                        homeViewModel.handleViewModelEvent(HomeViewModelEvent.GetUsers())
                    }}
                />
            </BaseScreen>
        )
    }

    // 그 외: 제목 + 내용(로딩 / 빈 목록 / 목록)
    return (
        <BaseScreen>
            <HomeTitleView
                onClickPractice={() => {
                    homeViewModel.handleViewModelEvent(HomeViewModelEvent.ClickPractice())
                }}
            />
            <HomeContentView
                homeUiState={homeUiState}
                onClickAddUser={() => {
                    homeViewModel.handleViewModelEvent(HomeViewModelEvent.ClickAddUser())
                }}
            />
        </BaseScreen>
    )
}

// ─────────────────────────────────────────────
// 아래 컴포넌트들은 export 하지 않음 → 이 파일 안에서만 사용 (Compose의 private @Composable fun)
// ─────────────────────────────────────────────

type HomeTitleViewProps = {
    onClickPractice: () => void
}

/**
 * 제목: "유저 리스트" + 오른쪽에 "연습" 버튼
 *
 * Compose: Row(verticalAlignment = CenterVertically) { Text(...); Spacer(weight(1f)); Button(...) }
 */
function HomeTitleView(props: HomeTitleViewProps): JSX.Element {
    return (
        <View style={styles.titleRow}>
            <Text style={styles.title}>유저 리스트</Text>
            <Pressable
                onPress={props.onClickPractice}
                style={(state) => {
                    if (state.pressed) {
                        return [styles.smallButton, styles.buttonPressed]
                    } else {
                        return [styles.smallButton]
                    }
                }}>
                <Text style={styles.smallButtonText}>연습</Text>
            </Pressable>
        </View>
    )
}

type HomeContentViewProps = {
    homeUiState: HomeUiState
    onClickAddUser: () => void
}

/**
 * 제목 아래 내용: 상태에 따라 로딩 / 빈 목록 / 목록 중 하나를 보여줌
 *
 * Compose:
 * when {
 *     uiState.isLoading -> HomeLoadingView()
 *     uiState.isEmpty -> HomeEmptyView(onClickAddUser)
 *     else -> HomeUserListView(uiState.users)
 * }
 */
function HomeContentView(props: HomeContentViewProps): JSX.Element {
    const homeUiState = props.homeUiState

    if (homeUiState.isLoading) {
        return <HomeLoadingView />
    }

    if (homeUiState.isEmpty) {
        return <HomeEmptyView onClickAddUser={props.onClickAddUser} />
    }

    // users가 null이면 빈 배열로 (FlatList는 null을 받지 않음)
    let users = homeUiState.users
    if (users === null) {
        users = []
    }
    return <HomeUserListView users={users} />
}

/**
 * 로딩: 남은 공간 가운데에 로딩 표시
 */
function HomeLoadingView(): JSX.Element {
    return (
        <View style={styles.centerContainer}>
            <ActivityIndicator size="large" />
        </View>
    )
}

type HomeEmptyViewProps = {
    onClickAddUser: () => void
}

/**
 * 빈 목록: 남은 공간 가운데에 안내 문구 + "계정 추가하러 가기" 버튼
 */
function HomeEmptyView(props: HomeEmptyViewProps): JSX.Element {
    return (
        <View style={styles.centerContainer}>
            <Text style={styles.messageTitle}>등록된 계정이 없어요</Text>
            <Text style={styles.messageBody}>계정을 추가하고 시작해 보세요</Text>
            <HomePrimaryButton text="계정 추가하러 가기" onPress={props.onClickAddUser} />
        </View>
    )
}

type HomeErrorViewProps = {
    onClickRetry: () => void
}

/**
 * 오류: 화면 전체 가운데에 오류 문구 + "다시 불러오기" 버튼
 */
function HomeErrorView(props: HomeErrorViewProps): JSX.Element {
    return (
        <View style={styles.centerContainer}>
            <Text style={styles.messageTitle}>데이터를 불러오지 못했어요</Text>
            <Text style={styles.messageBody}>네트워크 연결을 확인한 뒤 다시 시도해 주세요</Text>
            <HomePrimaryButton text="다시 불러오기" onPress={props.onClickRetry} />
        </View>
    )
}

type HomeUserListViewProps = {
    users: Array<User>
}

/**
 * 유저 목록 (Compose: LazyColumn)
 */
function HomeUserListView(props: HomeUserListViewProps): JSX.Element {
    return (
        <FlatList
            data={props.users}
            keyExtractor={(item) => {
                return String(item.id)
            }}
            renderItem={(info) => {
                return <HomeUserItemView user={info.item} />
            }}
        />
    )
}

type HomeUserItemViewProps = {
    user: User
}

/**
 * 유저 목록의 한 줄
 */
function HomeUserItemView(props: HomeUserItemViewProps): JSX.Element {
    return <Text style={styles.userText}>{props.user.nickname}</Text>
}

type HomePrimaryButtonProps = {
    text: string
    onPress: () => void
}

/**
 * 파란 버튼 (누르는 동안 흐려짐)
 * 빈 목록, 오류 화면에서 같이 사용
 */
function HomePrimaryButton(props: HomePrimaryButtonProps): JSX.Element {
    return (
        <Pressable
            onPress={props.onPress}
            style={(state) => {
                if (state.pressed) {
                    return [styles.button, styles.buttonPressed]
                } else {
                    return [styles.button]
                }
            }}>
            <Text style={styles.buttonText}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    // 제목과 연습 버튼을 가로로 양 끝에 배치
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginVertical: 10,
    },
    title: {
        color: "#000000",
        fontSize: 20,
        fontWeight: "bold",
    },
    userText: {
        marginHorizontal: 20,
        marginVertical: 10,
        color: "#000000",
        fontSize: 20,
    },
    // 남은 공간을 다 차지하고, 내용을 가로/세로 가운데 정렬
    // Compose: Column(Modifier.weight(1f).fillMaxWidth(), verticalArrangement = Center, horizontalAlignment = CenterHorizontally)
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    messageTitle: {
        color: "#000000",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    messageBody: {
        marginTop: 8,
        color: "#666666",
        fontSize: 14,
        textAlign: "center",
    },
    button: {
        marginTop: 24,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: "#3366ff",
    },
    buttonPressed: {
        opacity: 0.6,
    },
    smallButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        backgroundColor: "#3366ff",
    },
    smallButtonText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "bold",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
})
