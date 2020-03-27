import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logo from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;
  const message = `Olá ${incident.name}, estou entrando em contato, pois gostaria de ajudar no caso "${incident.title}" com o valor de ${
    Intl.NumberFormat('pt-BR',
      {
        style: 'currency',
        currency: 'BRL'
      }).format(incident.value)}`

  function navigateBack() {
    navigation.goBack()
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={logo} />
        <TouchableOpacity onPress={navigateBack} >
          <FontAwesome name="arrow-left" size={28} color='#e02041' />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentPrimary, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentSecondary}>{incident.name} de {incident.city} / {incident.uf}</Text>

        <Text style={styles.incidentPrimary}>CASO:</Text>
        <Text style={styles.incidentSecondary}>{incident.title}</Text>

        <Text style={styles.incidentPrimary}>Valor:</Text>
        <Text style={styles.incidentSecondary}>
          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactContainer}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso :)</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.contacts}>

          <TouchableOpacity style={styles.contact} onPress={sendWhatsapp}>
            <FontAwesome name="whatsapp" size={20} color='#fff' />
            <Text style={styles.contactText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contact} onPress={sendMail}>
            <FontAwesome name="envelope" size={20} color='#fff' />
            <Text style={styles.contactText}>E-mail</Text>
          </TouchableOpacity>

        </View>
      </View>

    </View>

  );
}
