import { useState, type JSX } from "react"
import { Alert, Button, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { BaseScreen } from "../../common/component/BaseScreen"
import Toast from "react-native-toast-message"

/**
 * 연습용 화면
 * 자유롭게 코드를 바꿔 가며 테스트하는 곳
 */
export function PracticeScreen(): JSX.Element {
    const name = "홍길동"
    const age = 25
    const hobby = "코딩"

    const greet: Greet = {
        name: "믹클"
    }

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
            <Greeting greet={greet} onClick={() => Alert.alert("인사 클릭!")}></Greeting>
            <Greeting2 {...greet} onClick={() => Alert.alert("인사2 클릭!")}></Greeting2>
            <ProfileCard name="Cake" occupation="Developer" profileImage="https://picsum.photos/100/100" isPremium= {true} onFollowPress={(name: string) => Alert.alert("??")}></ProfileCard>
            <Counter></Counter>
            <CartView></CartView>
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

type Greet = {
    name: string,
    message?: string
}

type GreetingProps = {
    greet: Greet,
    onClick: () => void
}

function Greeting({greet, onClick}: GreetingProps) {
    const { name, message = "반갑습니다" } = greet

    return (
        <Pressable style={{alignSelf: "stretch"}} onPress={onClick}>
            <Text style={{fontSize: 20, color: "#d09696"}}>{greet.name}</Text>
            <Text style={{fontSize: 15}}>{message}</Text>
        </Pressable>
        // <View style={{alignSelf: "stretch"}}>
        //     <Text style={{fontSize: 20, color: "#d09696"}}>{greet.name}</Text>
        //     <Text style={{fontSize: 15}}>{message}</Text>
        // </View>
    )
}

type Greeting2Props = {
    name: string
    message?: string
    onClick?: () => void
}

function Greeting2({name, message = "~~", onClick}: Greeting2Props) {
    return (
        <Pressable style={{alignSelf: "stretch"}} onPress={onClick}>
            <Text style={{fontSize: 20, color: "#d09696"}}>{name}</Text>
            <Text style={{fontSize: 15}}>{message}</Text>
        </Pressable>
    )
}

type ProfileCardProps = {
    name: string,
    occupation: string,
    profileImage?: string,
    isPremium: boolean,
    onFollowPress: (name: string) => void
}

function ProfileCard({name, occupation, profileImage = "https://via.placeholder.com/100", isPremium, onFollowPress}: ProfileCardProps) {
    let view
    view = <View style={styles.card}>
      <Image source={{ uri: profileImage }} style={styles.image} />

      <View style={styles.info}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          {isPremium && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>★ Premium</Text>
            </View>
          )}
        </View>

        <Text style={styles.occupation}>{occupation}</Text>

        <TouchableOpacity 
          style={styles.followButton}
          onPress={() => onFollowPress(name)}
        >
          <Text style={styles.followText}>팔로우</Text>
        </TouchableOpacity>
      </View>
    </View>

    return view
}

function Counter() {
    const [state, setState] = useState(0)

    const increment = () => {
        setState(prev => prev + 1)
    }
    
    let view
    view = <View>
        <Text>현재 숫자: {state}</Text>
        <Button onPress={() => {setState(prev => prev + 1)}} title={"증가 " + state}></Button>
        <Button onPress={() => {increment()}} title={"증가 " + state}></Button>
    </View>
    
    return view
}

type Cart = {
    id: number,
    name: string,
    price: number,
    quantity: number
}

type InputState = {
    id?: string,
    quantity?: string
}

function CartView() {
    const [cart, setCart] = useState<Cart[]>()
    const [input, setInput] = useState<InputState>()

    const INITIAL_CART: Cart[] = [
        {id: 1, name: "사과", price: 2000, quantity: 0},
        {id: 2, name: '바나나', price: 3000, quantity: 0},
        {id: 3, name: '오렌지', price: 2500, quantity: 0}
    ]
    
    const getCha = () => {
        setCart(INITIAL_CART)
    }

    const updateQuantity = (id: number, delta: number): boolean => {
        const exists = cart?.some(item => item.id === id)
        if(!exists) {
            return false
        }
        setCart(prev => prev?.map(item => item.id === id ? {...item, quantity: Math.max(0, item.quantity + delta)} : item))
        return true
    }

    // TODO getTotalPrice, clearCart

    return (
        <ScrollView>
            <Pressable onPress={getCha}>
                <Text style={{padding: 20}}>담기</Text>
            </Pressable>
            <View>
                <TextInput 
                value={input?.id ?? ""} 
                onChangeText={ text => {
                    setInput(prev => ({...prev, id: text}))}
                } 
                placeholder="ID" 
                keyboardType="numeric"></TextInput>
                <TextInput
                value={input?.quantity ?? ""}
                onChangeText={ text => {
                    if (!/^([1-9]\d*)?$/.test(text)) {
                        Toast.show({ type: "success", text1: "숫자만 쓰셈" })
                        return
                    }
                    setInput(prev => ({...prev, quantity: text}))
                }} 
                placeholder="양" 
                keyboardType="default"></TextInput>
                <Pressable onPress={() => {
                     if (!input?.id || !input?.quantity) {
                        Alert.alert("ID와 양을 모두 입력하세요")
                            return
                    }
                    const id = Number(input.id)
                    const quantity = Number(input.quantity)
                    if (isNaN(id) || isNaN(quantity)) {
                        Alert.alert("숫자만 입력하세요")
                        return
                    }
                    const success = updateQuantity(id, quantity)
                    if(!success) {
                        Toast.show({type: "error", text1: "ID " + id + " 상품이 없습니다."})
                    }
                    }}>
                    <Text style={{padding: 20}}>수량 업데이트</Text>
                </Pressable> 
            </View>
            {cart?.map(item => (
                <Text>{item.id} {item.name} {item.price}원 x {item.quantity}</Text>
            ))}
        </ScrollView>
    )
}

// LinearLayout의 gravity에서 세로 성분은 justifyContent, 가로 성분은 alignItems
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
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginVertical: 8,
        marginHorizontal: 20
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    info: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    badge: {
        marginLeft: 8,
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    occupation: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    followButton: {
        marginTop: 8,
        backgroundColor: '#007AFF',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    followText: {
        color: 'white',
        fontWeight: 'bold',
    }
})