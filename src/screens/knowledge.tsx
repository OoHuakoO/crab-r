import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '@src/components/core/header';
import { theme } from '@src/theme';
import { HomeStackParamsList } from '@src/typings/navigation';
import React, { FC } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Text } from 'react-native-paper';

type KnowledgeScreenProps = NativeStackScreenProps<
    HomeStackParamsList,
    'Knowledge'
>;

const KnowledgeScreen: FC<KnowledgeScreenProps> = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <View style={styles.columnTitle}>
                    <View style={styles.imageBookKnowledgeContainer}>
                        <Image
                            source={require('../../assets/images/bookKnowledge.png')}
                            style={styles.imageBookKnowledge}
                        />
                    </View>
                    <View style={styles.knowledgeContainer}>
                        <View>
                            <Text style={styles.buttonText}>องค์ความรู้</Text>
                            <Text style={styles.buttonSubtext}>Knowledge</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.divider} />
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                        style={styles.rowMenu1}
                    >
                        <View style={styles.imageCrabCircuitContainer}>
                            <Image
                                source={require('../../assets/images/crabCircuit.png')}
                                style={styles.imageCrabCircuit}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.columnButtonText}>
                                    ข้อมูลวงจรปู
                                </Text>
                                <Text style={styles.columnButtonSubtext}>
                                    Crab circuit information
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                        style={styles.rowMenu2}
                    >
                        <View style={styles.imageHighAndLowContainer}>
                            <Image
                                source={require('../../assets/images/highAndLow.png')}
                                style={styles.imageHighAndLow}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.columnButtonText}>
                                    ข้อมูลน้ำขึ้น-น้ำลง
                                </Text>
                                <Text style={styles.columnButtonSubtext}>
                                    High and low tide information
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                        style={styles.rowMenu3}
                    >
                        <View style={styles.imagePhContainer}>
                            <Image
                                source={require('../../assets/images/ph.png')}
                                style={styles.imagePh}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.columnButtonText}>
                                    ข้อมูลค่ากรด-ด่าง (pH)
                                </Text>
                                <Text style={styles.columnButtonSubtext}>
                                    Acid-alkaline (ph) value information
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                        style={styles.rowMenu4}
                    >
                        <View style={styles.imageAlkalinityTotalContainer}>
                            <Image
                                source={require('../../assets/images/alkalinityTotal.png')}
                                style={styles.imageAlkalinityTotal}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.columnButtonText}>
                                    ข้อมูลค่าอัลคาไลนิตี้รวม
                                </Text>
                                <Text style={styles.columnButtonSubtext}>
                                    Total alkalinity data
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                        style={styles.rowMenu5}
                    >
                        <View style={styles.imageAmmoniaContainer}>
                            <Image
                                source={require('../../assets/images/ammonia.png')}
                                style={styles.imageAmmonia}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.columnButtonText}>
                                    ข้อมูลค่าแอมโมเนีย
                                </Text>
                                <Text style={styles.columnButtonSubtext}>
                                    Ammonia value information
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                        style={styles.rowMenu6}
                    >
                        <View style={styles.imageMgContainer}>
                            <Image
                                source={require('../../assets/images/mg.png')}
                                style={styles.imageMg}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.columnButtonText}>
                                    ข้อมูลค่าแมกนีเซียมและแคลเซียม
                                </Text>
                                <Text style={styles.columnButtonSubtext}>
                                    Magnesium and calcium information
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                        style={styles.rowMenu7}
                    >
                        <View style={styles.imageChlorineContainer}>
                            <Image
                                source={require('../../assets/images/cl.png')}
                                style={styles.imageChlorine}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.columnButtonText}>
                                    ข้อมูลค่าคลอลีน
                                </Text>
                                <Text style={styles.columnButtonSubtext}>
                                    Chlorine value information
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary
    },
    scrollView: {
        flex: 1,
        marginTop: 65
    },
    columnTitle: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 50,
        width: '70%'
    },
    imageBookKnowledgeContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        zIndex: 1,
        left: 60
    },
    imageBookKnowledge: {
        width: 120,
        height: 130,
        position: 'absolute',
        zIndex: 1,
        top: -5
    },
    knowledgeContainer: {
        marginTop: 40,
        marginLeft: 180,
        width: 180,
        height: 90
    },
    buttonText: {
        fontSize: 32,
        fontFamily: 'K2D-Bold',
        marginLeft: 20,
        marginBottom: -10,
        color: theme.colors.white
    },
    buttonSubtext: {
        fontFamily: 'K2D-Bold',
        fontSize: 24,
        color: theme.colors.white,
        marginLeft: 20
    },
    columnButtonText: {
        fontFamily: 'K2D-Bold',
        fontSize: 18,
        color: theme.colors.primary,
        marginLeft: 20,
        marginBottom: -10
    },
    columnButtonSubtext: {
        fontFamily: 'K2D-Regular',
        fontSize: 16,
        color: theme.colors.primary,
        marginLeft: 20
    },
    divider: {
        height: 3,
        backgroundColor: theme.colors.white,
        width: '90%',
        alignSelf: 'center',
        marginTop: -40,
        marginBottom: 15
    },
    menuContainer: {
        padding: 30,
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowMenu1: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 50,
        width: '75%',
        marginTop: 15
    },
    textContainer: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: theme.colors.secondary,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 80
    },
    imageCrabCircuitContainer: {
        width: 90,
        height: 90,
        position: 'absolute',
        zIndex: 1,
        left: 25
    },
    imageCrabCircuit: { width: '100%', height: '100%' },
    rowMenu2: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 50,
        width: '75%',
        marginTop: -15
    },
    imageHighAndLowContainer: {
        width: 90,
        height: 90,
        position: 'absolute',
        zIndex: 1,
        left: 25
    },
    imageHighAndLow: { width: '100%', height: '100%' },
    rowMenu3: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 50,
        width: '75%',
        marginTop: -15
    },
    imagePhContainer: {
        width: 90,
        height: 90,
        position: 'absolute',
        zIndex: 1,
        left: 25
    },
    imagePh: { width: '100%', height: '100%' },
    rowMenu4: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 50,
        width: '75%',
        marginTop: -15
    },
    imageAlkalinityTotalContainer: {
        width: 90,
        height: 90,
        position: 'absolute',
        zIndex: 1,
        left: 25
    },
    imageAlkalinityTotal: { width: '100%', height: '100%' },
    rowMenu5: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 50,
        width: '75%',
        marginTop: -15
    },
    imageAmmoniaContainer: {
        width: 90,
        height: 90,
        position: 'absolute',
        zIndex: 1,
        left: 25
    },
    imageAmmonia: { width: '100%', height: '100%' },
    rowMenu6: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 50,
        width: '75%',
        marginTop: -15
    },
    imageMgContainer: {
        width: 90,
        height: 90,
        position: 'absolute',
        zIndex: 1,
        left: 25
    },
    imageMg: { width: '100%', height: '100%' },
    rowMenu7: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        marginBottom: 40,
        width: '75%',
        marginTop: -15
    },
    imageChlorineContainer: {
        width: 90,
        height: 90,
        position: 'absolute',
        zIndex: 1,
        left: 25
    },
    imageChlorine: { width: '100%', height: '100%' }
});

export default KnowledgeScreen;
