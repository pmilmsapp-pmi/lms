import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = CARD_WIDTH * 1.58; // Rasio KTA standar

export default function MemberCard({ user }) {
  if (!user) return null;

  // Logika Penentuan Desain (Sama seperti Flutter)
  const jabatanRaw = (user.namaKategori || '').toUpperCase();
  const isStaff = ['STAF', 'PEGAWAI', 'PENGURUS'].includes(jabatanRaw);

  // Normalisasi Label Jabatan
  let jabatanDisplay = jabatanRaw;
  if (jabatanRaw === 'TSR') jabatanDisplay = 'TENAGA SUKARELA';
  else if (jabatanRaw === 'KSR') jabatanDisplay = 'KORPS SUKARELA';
  else if (jabatanRaw === 'PMR') jabatanDisplay = 'PALANG MERAH REMAJA';

  // Pilih Background
  const bgImage = isStaff 
    ? require('../assets/bg_card2.png') // Pastikan file ini ada
    : require('../assets/bg_card.jpeg'); // Pastikan file ini ada

  return (
    <View style={styles.cardContainer}>
      <Image source={bgImage} style={styles.bgImage} resizeMode="stretch" />

      {/* --- LAYOUT KARTU MERAH (RELAWAN) --- */}
      {!isStaff && (
        <>
          {/* Header Info (QR & Jabatan) */}
          <View style={styles.redHeader}>
            <View style={styles.qrBox}>
              <QRCode value={user.kodeAnggota} size={45} />
            </View>
            <View style={styles.redHeaderText}>
              <Text style={styles.jabatanTitle}>{jabatanDisplay}</Text>
              <Text style={styles.subTitle}>PMI {user.parentPmi}</Text>
              <Text style={styles.subTitle}>UNIT {user.unit}</Text>
            </View>
          </View>

          {/* Foto Profil */}
          <View style={styles.photoWrapperRed}>
            <Image 
              source={{ uri: user.avatarUrl }} 
              style={styles.photo} 
            />
          </View>

          {/* Logo PMI Bawah */}
          <View style={styles.logoBottom}>
             <Image source={require('../assets/pmi.png')} style={{width: 80, height: 80, resizeMode:'contain'}} />
          </View>

          {/* Nama & NIA */}
          <View style={styles.bottomText}>
            <Text style={styles.nameWhite}>{user.nama}</Text>
            <Text style={styles.niaWhite}>NI. {user.kodeAnggota}</Text>
          </View>
        </>
      )}

      {/* --- LAYOUT KARTU PUTIH (STAFF) --- */}
      {isStaff && (
        <>
          {/* Foto Profil */}
          <View style={styles.photoWrapperWhite}>
            <Image 
              source={{ uri: user.avatarUrl }} 
              style={styles.photo} 
            />
          </View>

          {/* Nama & NIA (Tengah) */}
          <View style={styles.middleText}>
            <Text style={styles.nameBlack}>{user.nama}</Text>
            <Text style={styles.niaBlack}>NI. {user.kodeAnggota}</Text>
          </View>

          {/* Footer Info */}
          <View style={styles.whiteFooter}>
            <View style={styles.qrBox}>
              <QRCode value={user.kodeAnggota} size={50} />
            </View>
            <View style={{alignItems: 'flex-end'}}>
               <Text style={styles.jabatanRed}>{jabatanDisplay}</Text>
               <Text style={styles.subRed}>MARKAS PUSAT</Text>
               <Text style={styles.subRed}>PALANG MERAH INDONESIA</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 5, // Shadow untuk Android
    shadowColor: '#000', // Shadow untuk iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  // --- Style Common ---
  photo: {
    width: 130,
    height: 160,
    resizeMode: 'cover',
  },
  
  // --- Style Merah ---
  redHeader: {
    flexDirection: 'row',
    marginTop: '28%',
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  qrBox: {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 2
  },
  redHeaderText: {
    marginLeft: 15,
  },
  jabatanTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: 'white',
    marginBottom: 2,
  },
  subTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  photoWrapperRed: {
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 4,
    borderColor: '#e20a16',
    backgroundColor: 'white',
    zIndex: 10,
  },
  logoBottom: {
    alignSelf: 'center',
    marginTop: -20, // Overlap sedikit dengan foto
    opacity: 0.9
  },
  bottomText: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  nameWhite: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  niaWhite: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },

  // --- Style Putih ---
  photoWrapperWhite: {
    alignSelf: 'center',
    marginTop: 80,
    borderWidth: 4,
    borderColor: '#e20a16',
    backgroundColor: 'white',
  },
  middleText: {
    alignItems: 'center',
    marginTop: 20,
  },
  nameBlack: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase',
  },
  niaBlack: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  whiteFooter: {
    position: 'absolute',
    bottom: 25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  jabatanRed: {
    fontSize: 18,
    fontWeight: '900',
    color: '#e20a16',
  },
  subRed: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#e20a16',
  }
});