import React, {Component} from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';

export default class AppButton extends Component {
	render () {
		const {action, iconName, iconColor, title, bgColor, setWidth} = this.props;
		const {width} = setWidth ? Dimensions.get('window') : {};
		return (
			<Button
				onPress={action}
				buttonStyle={{
					backgroundColor: bgColor,
					height: 65,
					borderColor: "transparent",
					borderWidth: 0,
					borderRadius: 55,
					marginBottom: 5,
					width: width,
					marginRight:40,
					marginLeft:40,
				}}
				title={title}
				icon={
					<Icon

						name={iconName}
						size={15}
						color={iconColor}
					/>
				}
				text={title}
				iconRight={true}
			>
			</Button>
		);
	}
}