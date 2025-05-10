import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import { Appbar, Searchbar, Card, BottomNavigation } from 'react-native-paper';
import styles from './styles';

function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Inicio', icon: 'home' },
    { key: 'favorites', title: 'Favoritos', icon: 'heart' },
    { key: 'settings', title: 'Ajustes', icon: 'cog' },
  ]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://api.github.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Acá más adelante podés usar la API de búsqueda
  };

  const renderUser = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.login}
        left={() => (
          <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
        )}
      />
    </Card>
  );

  const renderContent = () => (
    <View style={styles.content}>
      <Searchbar
        placeholder="Buscar usuarios"
        onChangeText={handleSearchChange}
        value={searchQuery}
      />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUser}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Fravega Tech" />
      </Appbar.Header>

      {renderContent()}

    </SafeAreaView>
  );
}

export default HomeScreen;
