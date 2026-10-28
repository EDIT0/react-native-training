import type { JSX } from "react"
import { Alert, Button, FlatList, ScrollView, StyleSheet, Text, View } from "react-native"
import { BaseScreen } from "../../common/component/BaseScreen"

/**
 * 연습용 화면
 * 자유롭게 코드를 바꿔 가며 테스트하는 곳
 */
export function PracticeScreen(): JSX.Element {
    const name = "홍길동"
    const age = 25
    const hobby = "코딩"

    return (
        <BaseScreen
        style={styles.container}>
            <Text style={styles.helloText}>이름: {name} {new Date().toLocaleDateString()}</Text>
            <WelcomeMessage isLoggedIn={true} message="메시지 안녕?"></WelcomeMessage>
            <View style= {{flex: 1}}>
                <TodoList></TodoList>
                <TodoList2></TodoList2>
                <ButtonView></ButtonView>
            </View>
            <UserProfileCard></UserProfileCard>
        </BaseScreen>
    )
}

type WelcomeMessageProps = {
    isLoggedIn: boolean,
    message?: string
}

function WelcomeMessage(props : WelcomeMessageProps) {
    // return (
    //     <View>
    //         {props.isLoggedIn ? <Text style={styles.welcomeText}>{props.message}</Text> : <Text style={styles.welcomeText}>로그인 필요</Text>} 
    //     </View>
    // )
    
    let statusComponent
    if(props.isLoggedIn) {
        statusComponent = <Text style={styles.welcomeText}>{props.message}</Text>
    } else {
        statusComponent = <Text style={styles.welcomeText}>로그인 필요</Text>
    }
    return (
        <View>
            {statusComponent}
        </View>
    )
}

function TodoList() {
    const todos = ["장보기", "운동하기", "코딩 공부", "책 읽기", "운동하기", "코딩 공부", "책 읽기", "운동하기", "코딩 공부", "책 읽기", "운동하기", "코딩 공부", "책 읽기", "운동하기", "코딩 공부", "책 읽기", "운동하기", "코딩 공부", "책 읽기", "운동하기", "코딩 공부", "책 읽기"]

    let view
    view = <ScrollView>
        <View>
            <Text>할 일 목록</Text>
            {todos.map((todo, index) => (
                <Text key={index} style={{fontSize: 50}}>{index + 1}. {todo}</Text>
            ))}
        </View>
    </ScrollView>
    

    return view
}

function TodoList2() {
    const users = [
        { id: 1, name: "김철수", age: 25 },
        { id: 2, name: "박영희", age: 30 },
        { id: 3, name: "이민수", age: 28 },
        { id: 1, name: "김철수", age: 25 },
        { id: 2, name: "박영희", age: 30 },
        { id: 3, name: "이민수", age: 28 },
        { id: 1, name: "김철수", age: 25 },
        { id: 2, name: "박영희", age: 30 },
        { id: 3, name: "이민수", age: 28 },
        { id: 1, name: "김철수", age: 25 },
        { id: 2, name: "박영희", age: 30 },
        { id: 3, name: "이민수", age: 28 },
        { id: 1, name: "김철수", age: 25 },
        { id: 2, name: "박영희", age: 30 },
        { id: 3, name: "이민수", age: 28 },
    ]

    let view
    view = <ScrollView>
        <View>
            <Text>할 일 목록</Text>
            {users.map((user, index) => (
                <Text key={index} style={{fontSize: 50}}>{index + 1}. {user.id} / {user.name} / {user.age}</Text>
            ))}
        </View>
    </ScrollView>
    

    return view
}

function ButtonView() {
    let view
    view = <View>
         <Button title="클릭" onPress={() => Alert.alert("zz")} />
    </View>

    return view
}

type UserForm = {
    name: string,
    age: number,
    isPremium: boolean,
    habitsList: Array<string>
}

function UserProfileCard() {
    const user: UserForm = {
        name: "케네스 민수 킴",
        age: 23,
        isPremium: true,
        habitsList: ["a", "b", "c"]
    }

    let adultState: string = ""
    if(user.age >= 20) {
        adultState = "성인"
    } else {
        adultState = "성인 아님 !"
    }
    let background
    if(user.isPremium) {
        background = styles.premiumUserProfile
    } else {
        background = styles.normalUserProfile
    }
    let habits = user.habitsList.join(" ")

    let view
    view = <View style={[background, {marginStart: 20, marginEnd: 20, marginTop: 10, marginBottom: 10}]}>
        <Text>{user.name}</Text>
        <Text>{user.age}세</Text>
        <Text>{adultState}</Text>
        <ScrollView style={{flexGrow: 0}}>
            <View>
                {user.habitsList.map((habit, index) => (
                    <Text key={index}>{index} {habit}</Text>
                ))}
                <Text>{habits}</Text>
            </View>
        </ScrollView>
    </View>
    
    return view
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // 부모 안에서 남은 공간을 얼마나 차지할 것인지 0~1
        backgroundColor: "#ffffff",
        alignItems: "center", // 가로 중앙 정렬
        // justifyContent: "center"를 쓰면 내용이 화면보다 클 때 위아래로 넘쳐서 StatusBar/NavigationBar를 덮음
    },
    helloText: {
        fontSize: 24,
        color: "blue",
        fontWeight: "bold"
    },
    welcomeText: {
        fontSize: 34,
        color: "blue",
        fontWeight: "bold"
    },
    premiumUserProfile: {
        borderRadius: 10,
        backgroundColor: "#ffd500",
        alignItems: "center",  // 카드 안 글자들: 가로 중앙 정렬 (gravity="center_horizontal")
        alignSelf: "stretch", // 카드 폭: 부모 가로를 꽉 채움 (match_parent)
    },
    normalUserProfile: {
        borderRadius: 10,
        backgroundColor: "#c0bfbe",
        alignItems: "center",  // 카드 안 글자들: 가로 중앙 정렬 (gravity="center_horizontal")
        alignSelf: "stretch", // 카드 폭: 부모 가로를 꽉 채움 (match_parent)
    }
})