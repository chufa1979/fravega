// src/screens/HomeScreen/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import { Appbar, Searchbar, Card } from 'react-native-paper';
import styles from './styles';
import { fetchUsers } from '../../services/userService';

function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers(); // ✅ Usá la función del servicio
        setUsers(data);
      } catch (error) {
        // Podés manejar el error acá si querés mostrar algo en UI
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
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
