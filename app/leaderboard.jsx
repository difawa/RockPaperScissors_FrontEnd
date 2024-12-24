import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Arrow from '../assets/images/home.png'
import crown from '../assets/images/crown.png'
import gold from '../assets/images/Gold.png'
import bronze from '../assets/images/Bronze.png'
import silver from '../assets/images/Silver.png'
import workout from '../assets/images/Workout.png'
import { router, useRouter } from "expo-router";

export default function Leaderboard() {
    const users = [
        {
            id: 1,
            name: 'Meghan Jessica',
            points: 100,
            image: 'https://cdn.medcom.id/dynamic/content/2023/06/23/1582497/28aTuCvJjp.jpg?w=1024',
        },
        {
            id: 2,
            name: 'Bryan Wolf',
            points: 93,
            image: 'https://cloud.jpnn.com/photo/arsip/normal/2023/09/09/penyanyi-bernadya-foto-dok-juni-records-vtpws-gtxb.jpg'
        },
        {
            id: 3,
            name: 'Alex Turner',
            points: 38,
            image: 'https://imgsrv2.voi.id/3XaczyXhDWylUN6wa73KVWSqPLwneMhoLWOxcDKg1PA/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy8zOTM4NTkvMjAyNDA2MjgwOTU4LW1haW4uY3JvcHBlZF8xNzE5NTQzNTA4LmpwZw.jpg',
        },
        {
            id: 4,
            name: 'Ridho Roma',
            points: 50,
            image: 'https://tse3.mm.bing.net/th?id=OIP.w-06h-8PQ5G6a4piXPcLEgHaFl&pid=Api&P=0&h=220',
        },
        {
            id: 5,
            name: 'Bernadya',
            points: 18,
            image: 'https://tse4.mm.bing.net/th?id=OIP.600qglcZCOQ2vV7eLUT6wwHaEf&pid=Api&P=0&h=220',
        },
        {
            id: 6,
            name: 'Aurora',
            points: 68,
            image: 'https://tse4.mm.bing.net/th?id=OIP.600qglcZCOQ2vV7eLUT6wwHaEf&pid=Api&P=0&h=220',
        },
        {
            id: 7,
            name: 'Bernadya',
            points: 83,
            image: 'https://tse4.mm.bing.net/th?id=OIP.600qglcZCOQ2vV7eLUT6wwHaEf&pid=Api&P=0&h=220',
        },
        {
            id: 8,
            name: 'Bernadya',
            points: 20,
            image: 'https://tse4.mm.bing.net/th?id=OIP.600qglcZCOQ2vV7eLUT6wwHaEf&pid=Api&P=0&h=220',
        },
        {
            id: 9,
            name: 'Bernadya',
            points: 17,
            image: 'https://tse4.mm.bing.net/th?id=OIP.600qglcZCOQ2vV7eLUT6wwHaEf&pid=Api&P=0&h=220',
        },
        {
            id: 10,
            name: 'Bernadya',
            points: 18,
            image: 'https://tse4.mm.bing.net/th?id=OIP.600qglcZCOQ2vV7eLUT6wwHaEf&pid=Api&P=0&h=220',
        },
        {
            id: 11,
            name: 'Bernadya',
            points: 18,
            image: 'https://tse4.mm.bing.net/th?id=OIP.600qglcZCOQ2vV7eLUT6wwHaEf&pid=Api&P=0&h=220',
        },
        {
            id: 12,
            name: 'Bernadya',
            points: 21,
            image: 'https://tse4.mm.bing.net/th?id=OIP.600qglcZCOQ2vV7eLUT6wwHaEf&pid=Api&P=0&h=220',
        },
        {
            id: 13,
            name: 'Bernadya',
            points: 37,
            image: 'https://tse4.mm.bing.net/th?id=OIP.600qglcZCOQ2vV7eLUT6wwHaEf&pid=Api&P=0&h=220',
        },
        {
            id: 14,
            name: 'Bernadya',
            points: 26,
            image: 'https://tse4.mm.bing.net/th?id=OIP.600qglcZCOQ2vV7eLUT6wwHaEf&pid=Api&P=0&h=220',
        },
    ]

    const sortedUsers = [...users].sort((a, b) => b.points - a.points);
    const topThree = sortedUsers.slice(0, 3);
    const others = sortedUsers.slice(3);

    return (
        <View style={[styles.container]}>
            <TouchableOpacity onPress={() => router.push('/main-menu')}>
                <Image source={Arrow} style={styles.arrow} />
            </TouchableOpacity>

            <Text style={styles.leaderboardtext}>LEADERBOARD</Text>
            {/* top 3 */}
            <View style={styles.topThreeContainer}>
                <View style={styles.secondPlace}>
                    <Image source={{ uri: topThree[1]?.image }} style={styles.topImage} />
                    <View style={{ bottom: 25, zIndex: 1 }}>
                        <Image source={silver} />
                    </View>
                    <Text style={styles.topText}>{topThree[1]?.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={workout} style={{ top: -4 }} />
                        <Text style={styles.scoreText}> {topThree[1]?.points} pts</Text>
                    </View>
                </View>
                <View style={styles.firstPlace}>
                    <View style={{ top: 10, zIndex: 1, marginTop: 30 }}>
                        <Image source={crown} />
                    </View>

                    <Image source={{ uri: topThree[0]?.image }} style={styles.topImage} />
                    <View style={{ bottom: 25, zIndex: 1 }}>
                        <Image source={gold} />
                    </View>
                    <Text style={styles.topText}>{topThree[0]?.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={workout} style={{ top: -4 }} />
                        <Text style={styles.scoreText}> {topThree[0]?.points} pts</Text>
                    </View>
                </View>
                <View style={styles.thirdPlace}>
                    <Image source={{ uri: topThree[2]?.image }} style={styles.topImage} />
                    <View style={{ bottom: 25, zIndex: 1 }}>
                        <Image source={bronze} />
                    </View>
                    <Text style={styles.topText}>{topThree[2]?.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={workout} style={{ top: -4 }} />
                        <Text style={styles.scoreText}> {topThree[2]?.points} pts</Text>
                    </View>
                </View>
            </View>
            <View style={styles.flatlistContainer}>
                <FlatList
                    style={{ height: 450 }}
                    data={others}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.listItem}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, color: '#ffffff', marginLeft: 5, fontFamily: 'PlusJakartaSans-Regular' }}>{index + 4}.</Text>
                                <Image source={{ uri: item.image }} style={styles.listImage} />
                                <Text style={styles.nameText}>{item.name}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 16, color: '#FEBB24', marginRight: 5, fontFamily: 'PlusJakartaSans-Regular' }}>{item.points} pts</Text>
                            </View>
                        </View>

                    )}
                />
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1C22',
    },
    arrow: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginBottom: 20,
        marginTop: 50
    },
    leaderboardtext: {
        alignSelf: 'center',
        marginBottom: 60,
        fontSize: 25,
        color: '#FEBB24',
        fontFamily: 'BlackHanSans',
    },
    topThreeContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    firstPlace: {
        alignItems: "center",
        width: 100,
        top: -100,
        zIndex: 1,
        marginTop: 30
    },
    secondPlace: {
        alignItems: "center",
        width: 100
    },
    thirdPlace: {
        alignItems: "center",
        width: 100
    },
    topText: {
        top: -10,
        fontSize: 12,
        fontWeight: "bold",
        color: "white",
    },
    scoreText: {
        fontSize: 14,
        color: "white",
        top: -8,
        fontFamily: 'PlusJakartaSans-Regular'
    },
    topImage: {
        borderRadius: 9999, // Full circle
        borderWidth: 3,
        borderColor: '#FEBB24',
        width: 70,
        height: 70,
        alignItems: 'center',
    },
    flatlistContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: 20,
        paddingBottom: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius:30
    },
    listImage: {
        borderRadius: 9999, // Full circle
        borderWidth: 2,
        borderColor: '#FEBB24',
        width: 40,
        height: 40,
        alignItems: 'center',
        marginLeft: 10
    },
    listItem: {
        flexDirection: 'row',
        width: 320,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#252728",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    nameText: {
        fontSize: 12,
        color: "#ffffff",
        marginLeft: 15,
        fontWeight: 'bold'
    },
})