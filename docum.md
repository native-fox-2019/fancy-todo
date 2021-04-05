# New Journey Documentation
### by Henarivan Andhika Abhirama

## File terkait:
- SetDestinationLocation2.js

## Navigasi:
### SetDestinationLocation2.js
- Confirm --> Services.js
- Edit --> LocationDetail.js

## SetDestinationLocation2.js
Merupakan Halaman awal delivery yang berisi list lokasi pengirim dan lokasi penerima.

### Lifecycle:
didMount:
- _getCurrentPosition(), redux action dalam maps.js action file, digunakan untuk mendapatkan geolocation user menggunakan library react-native-geolocation-service.

didUpdate:
```javascript
isDeviceLocation && !receiverList.length
          ? onBackNavigation()
          : setShowCancelInput(true);
```
- backHandler, terdapat dua kondisi disini. 1. jika user belum melakukan input lokasi atau edit lokasi, maka akan langsung kembali ke Homescreen (onBackNavigation()). 2. Jika user telah melakukan input lokasi pengirim dan penerima, maka akan memunculkan popup batalkan (setShowCancelInput(true))

```javascript
if (navigation.isFocused() && receiverList.length > 0) {
      checkMultitrip(
        {
          sender: isDeviceLocation ? currentPayload : sender,
          receiver: receiverList,
          item_specification: itemSpecList,
        },
        () => setOutOfRangeSingle(true),
        () => {
          setOutOfRangeMultiple(true);
          setDisabledButton(true);
        },
        () => {
          setOutOfRangeSingle(false);
          setDisabledButton(false);
        },
        (bool) => setCheckingArea(bool)
      );
    }
```
- checking lalamove service area,
checkMultitrip api calls yg mempunyai 4 parameter 1. Payload 2. Handler error single location 3. Handler error multiple location 4. Handler success.
Depedency variables: receiverList, sender, itemSpecList, navigation.

### Child Component
- AnimatedRowItem

Digunakan untuk running text lokasi lengkap pengirim (terletak dalam component render method), dan lokasi lengkap penerima (terletak dalam component renderReceiverList method).

Parameters:
#### index
#### name: string
#### phone: string
#### address: string
#### styleObject: Obj, desc: object of styles needed.
#### onPressFunc: func, desc: function that is called when user click on the item
#### type: string, desc: the type of location ex, receiver/sender
#### deleteIcon: bool, desc: flag for delete icon appearance
#### onDeleteIconPress: func

Menggunakan library react-native-reanimated

### Actions:
- Confirm Input
```javascript
const confirmLocationData = () => {
    dispatch(getServiceStart());
    isDeviceLocation &&
      dispatch(
        editSenderData({
          note: "",
          name: userName,
          phone: userPhone,
          latitude,
          longitude,
          place_name: route || getPlaceName(currentAddress),
          formattedAddress: currentAddress,
          city,
          province,
          district,
          sub_district,
        })
      );
    navigation.navigate("Services");
  };
```
Melalui button 'Lanjutkan', confirmLocationData() akan terpanggil, memulai loading untuk halaman berikutnya (dispatch(getServiceStart())), menginput data gps serta nama dan nomor akun jika user tidak melakukan perubahan lokasi pengirim.
Button ini mempunyai status disabled jika variable disabledButton adalah true, receiver kosong, dan checkMultitrip() sedang berlangsung.
