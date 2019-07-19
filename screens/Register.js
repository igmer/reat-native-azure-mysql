import React, {Component} from 'react';
import {View} from 'react-native';
import BackgroundImage from "../component/BackgroundImage";
import AppButton from "../component/AppButton";
import {Card} from "react-native-elements";
import Toast from 'react-native-simple-toast';
var _ = require('lodash');

import t from 'tcomb-form-native';
const Form = t.form.Form;
import FormValidation from '../utils/validation';

import * as firebase from 'firebase';
import moment from "moment";
import {ScrollView} from "react-navigation";
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textboxView.normal.marginBottom = 5;
stylesheet.textboxView.error.marginBottom = 5;
export default class Register extends Component {
	constructor () {
		super();

		this.state = {
			user: {}
		};

		this.samePassword = t.refinement(t.String, (s) => {
			return s === this.state.user.password
		});

		this.user = t.struct({
			email: FormValidation.email,
			password: FormValidation.password,
			password_confirmation: this.samePassword,
			fechaNacimiento: t.Date,
			profesion: t.String,
			direccion: t.String
		});
		let myFormatFunction = (format,date) =>{
			return moment(date).format(format);
		}

		this.options = {
			fields: {
				email: {
					placeholder: 'Introduce un email',
					error: 'Email incorrecto',
					autoCapitalize: 'none',
					stylesheet: stylesheet
				},
				password: {
					placeholder: 'Introduce un password',
					error: 'Password incorrecto',
					password: true,
					secureTextEntry: true,
				},
				password_confirmation: {
					placeholder: 'Repite el password',
					error: 'Los passwords no coinciden',
					password: true,
					secureTextEntry: true,
				},
				fechaNacimiento: {
					label: 'Fecha Nacimiento',
					placeholder: 'Ingresa tu fecha Nacimiento',
					mode: 'date',
					config:{
						format:(date) => myFormatFunction("DD MMM YYYY",date)

					}
				},
				profesion:{
					label: 'Profesion',
					placeholder:'Ingresa tu profesion',
					autoCapitalize:'sentences'
				},
				direccion: {
					label: 'Direccion',
					placeholder: 'Ingresa tu direccion',
					autoCapitalize:'sentences'
				}
			}
		};

		this.validate = null;
	}

	register () {
		if(this.validate) {
			this.save();
			firebase.auth().createUserWithEmailAndPassword(
				this.validate.email, this.validate.password
			)

				.then(() => {


				})
				.catch (err => {
					Toast.showWithGravity(err.message, Toast.LONG, Toast.BOTTOM);
				})
		}
	}
	save () {
		const validate = this.refs.form.getValue();
		if(validate) {
			let data = {};
			const key = firebase.database().ref().child('usuarios').push().key;
			data[`usuarios/${key}`] = this.state.user;
			firebase.database().ref().update(data).then(() => {
				Toast.showWithGravity('usuario Registrado', Toast.LONG, Toast.BOTTOM);

			});
		}
	}

	onChange (user) {

	}

	render () {
		return (
			<BackgroundImage source={require('../assets/images/login-bg.png')}>
				<View>
					<ScrollView>
					<Card wrapperStyle={{paddingLeft: 10}} title="Regístrate">
						<Form
							ref="form"
							type={this.user}
							options={this.options}
							onChange={(v) => this.onChange(v)}
							value={this.state.user}
						/>
						<AppButton
							bgColor={'rgba(200,30,129,0.9)'}
							title="Registrarme"
							action={this.register.bind(this)}
							iconName="user-plus"
							iconSize={30}
							iconColor="#fff"
						/>
					</Card>
					</ScrollView>
				</View>
			</BackgroundImage>
		)
	}
}