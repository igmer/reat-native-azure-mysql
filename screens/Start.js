import React, {Component} from 'react';
import {View} from 'react-native';
import BackgroundImage from "../component/BackgroundImage";
import AppButton from "../component/AppButton";
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';


export default class Start extends Component {
	static navigationOptions = {
		title: 'Expo App',
	};

	login () {
		const navigateAction = NavigationActions.navigate({
			routeName: 'Login'
		});
		this.props.navigation.dispatch(navigateAction);
	}

	register () {
		const navigateAction = NavigationActions.navigate({
			routeName: 'Register'
		});
		this.props.navigation.dispatch(navigateAction);
	}


	render () {
		return (
			<BackgroundImage source={require('../assets/images/login-bg.png')}>
				<View style={{justifyContent: 'center', flex: 1}}>
					<AppButton
						bgColor="rgba(111, 38, 74, 0.7)"
						title="Entrar"
						action={this.login.bind(this)}
						iconName="sign-in"
						iconSize={30}
						iconColor="#fff"
					/>
					<AppButton
						bgColor="rgba(200, 200, 50, 0.7)"
						title="Regístrarme"
						action={this.register.bind(this)}
						iconName="user-plus"
						iconSize={30}
						iconColor="#fff"
					/>

				</View>
			</BackgroundImage>
		);
	}
}