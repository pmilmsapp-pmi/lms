import React, { useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  ActivityIndicator, 
  Text, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share'; // Untuk fitur share/save gambar
import { useUserProfile } from '../hooks/useUserProfile';
import MemberCard from '../components/MemberCard';

export default function KtaScreen() {
  const { user, loading, error } = useUserProfile();
  const viewShotRef = useRef();

  // Fungsi Download/Share
  const handleDownload = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      await Share.open({
        url: uri,
        message: 'KTA Digital PMI'
      });
    } catch (e) {
      Alert.alert("Gagal", "Gagal menyimpan gambar");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e20a16" />
        <Text>Memuat Data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{color: 'red'}}>Terjadi Kesalahan: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {/* ViewShot membungkus kartu agar bisa discreenshot */}
        <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 1.0 }}>
          <MemberCard user={user} />
        </ViewShot>
      </View>

      {/* Tombol Download */}
      <TouchableOpacity style={styles.button} onPress={handleDownload}>
        <Text style={styles.buttonText}>UNDUH / BAGIKAN KTA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    marginBottom: 30,
    // Shadow di luar viewshot agar tidak terpotong saat capture
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  button: {
    backgroundColor: '#e20a16',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});