// src/screens/UserDetails/UserDetailScreen.tsx
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { RootStackParamList } from '../../navigations/AppNavigator';
import { fetchUserDetails } from '../../services/userService';
import { FavoritesContext } from '../../context/FavoritesContext';
import styles from './styles';

type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

export default function UserDetailScreen() {
  const { params } = useRoute<UserDetailRouteProp>();
  const { username } = params;
  const navigation = useNavigation();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isFavorite = favorites.includes(username);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserDetails(username);
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [username]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Detalle de Usuario" />
        </Appbar.Header>
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Fravega Tech" />
      </Appbar.Header>
        <View style={styles.centered}>
          <Text>Error al cargar usuario</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Fravega Tech" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
        <Text style={styles.name}>{user.name || user.login}</Text>
        <Text style={styles.username}>@{user.login}</Text>
        <Text style={styles.bio}>{user.bio || 'Sin biografía'}</Text>
        <Text style={styles.info}>Repos públicos: {user.public_repos}</Text>
        <Text style={styles.info}>Seguidores: {user.followers}</Text>
        <Text style={styles.info}>Siguiendo: {user.following}</Text>

        <TouchableOpacity
          style={[styles.button, isFavorite ? styles.buttonRemove : styles.buttonAdd]}
          onPress={() => toggleFavorite(username)}
        >
          <Text style={styles.buttonText}>
            {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, isFavorite ? styles.buttonRemove : styles.buttonAdd]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>
            {'Volver'}
          </Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}
