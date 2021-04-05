# New Journey Documentation
### by Henarivan Andhika Abhirama

## File terkait:
- SetDestinationLocation2.js

## Navigasi:
### SetDestinationLocation2.js
- Confirm --> Services.js
- Pilih Lokasi --> SelectLocation.js
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

## SelectLocation.js
Halaman pilih lokasi yg terdiri dari input pencarian lokasi, button pilih via maps, list lokasi favorit dan lokasi terakhir.

### Lifecycle

didMount:
- getFavoriteLocation(), redux actions dalam order.js action file yg melakukan request api untuk mendapatkan data lokasi favorit user

didUpdate:
- resetStateSearch(), redux actions dalam maps.js action file yg melakukan reset terhadap data hasil pencarian lokasi, resetStateSearch akan terpanggil saat length dari searchValue sama dengan 1. Depedency variables: searchValue.

### Child Component
- SearchResult

Komponen yg menampilkan List item lokasi hasil pencarian (terdapat dalam component render method).

Parameters:
#### isVisible: bool
#### styleObject: Obj, desc: object of styles needed.
#### data: Arr, desc: list item yg akan di tampilkan
#### action: func, desc: function that is called when user click on the item
#### cancelAction: func

- RowItem

Komponen yg menampilkan item. Dalam komponen ini, RowItem digunakan untuk menampilkan 2 lokasi favorit (terletak dalam component render method) dan lokasi terakhir (terletak dalam component renderLastOrder method).

Parameters:

(Parameter yg dipakai dalam komponen ini adalah type, isFirstItem, isLastItem, onPress2, item)
#### isFirstItem: bool
#### isLastItem: bool
#### item: Obj
#### type: string
#### onPress1: func, desc: function that is called when user click on the item, for renderSearchResult method
#### onPress2: func, desc: function that is called when user click on the item, for renderFavorite method
#### icon: ReactComponent, desc: komponen icon (kiri) yg akan di tampilkan
#### iconContainerStyle: StyleObject, desc: Style kontainer komponen icon (kiri) yg akan di tampilkan
#### editMode: bool, desc: flag untuk menampilkan icon tertentu saat berada dalam flow edit
#### iconEditMode: ReactComponent, desc: komponen icon (kanan) yg akan di tampilkan saat dalam flow edit
#### withoutRightIcon: bool, desc: flag untuk menentukan apakah icon (kanan, renderFavorite) akan di tampilkan atau tidak
#### itemLine: int, default: 1, desc: jumlah line dari deskripsi item
#### additionalContent: string, desc: text tambahan dibawah deskripsi item
#### noRightIcon: bool, desc: flag untuk menentukan apakah icon (kanan, renderSearchResult) akan di tampilkan atau tidak
#### action: func, desc: function that is called when user click on the item
#### infoButton: ReactComponent, desc: komponen icon info item
#### titleStyle: Obj, desc: style dari title item
#### fullWidthUnderline: bool, desc: flag untuk menentukan apakah underline mengisi seluruh lebar komponen atau tidak
(Required Parameters: type, item, onPress1/onPress2, icon(hanya untuk renderSearchResult))

### Actions
- On Change Text
```javascript
const handleAutoComplete = (value) => {
    let newSessionToken;

    if (autoCompleteSessionToken === "") {
      newSessionToken = uuidv4();

      dispatch(
        setSessionToken({
          sessionToken: newSessionToken,
          expiredDate: moment().add(2, "minutes"),
        })
      );
    } else {
      let now = moment();
      let newExpiredDate =
        typeof autoCompleteSessionTokenExpiredDate === "string"
          ? moment(new Date(autoCompleteSessionTokenExpiredDate))
          : autoCompleteSessionTokenExpiredDate;
      if (now > newExpiredDate) {
        newSessionToken = uuidv4();
        dispatch(
          setSessionToken({
            sessionToken: newSessionToken,
            expiredDate: moment().add(2, "minutes"),
          })
        );
      }
    }

    const searchPlaceParam = encodeURIComponent(value);

    dispatch(
      searchPlace({
        sessionToken: newSessionToken
          ? newSessionToken
          : autoCompleteSessionToken,
        param: searchPlaceParam,
      })
    );
  };

  const debouncedAutoComplete = useCallback(debounce(handleAutoComplete, 375), [
    autoCompleteSessionToken,
    autoCompleteSessionTokenExpiredDate,
  ]);

  const onChangeText = (value) => {
    setSearchValue(value);

    if (value.length > 2) {
      debouncedAutoComplete(value);
      setShowSearchResult(true);
    } else if (value.length > 0) {
      setShowSearchResult(false);
    } else {
      setShowSearchResult(false);
    }
  };
```
debouncedAutoComplete akan terpanggil saat user input melebihi 2 karakter, yg mana merupakan debounce function yg berisi callback handleAutoComplete().
Dalam handleAutoComplete function terjadi pengecekan state redux autoCompleteSessionToken dan autoCompleteSessionTokenExpiredDate, apakah perlu di replace atau tidak. Ini digunakan untuk mekanisme autoComplete api call di server yg membutuhkan pergantian sessionToken dengan umur token 2 menit.

- Select Location From Search Result
```javascript
const selectFromSearchResult = (item) => {
    const param = {
      route: item.name,
      placeId: item.placeId,
      sessionToken: autoCompleteSessionToken,
    };
    if (type === "sender") {
      navigation.navigate("HelpDelivery");
    }
    navigation.navigate("LocationDetail", {
      getGeocode: { is: true, param },
      inputData: inputData || {},
      type,
    });

    setShowSearchResult(false);
    dispatch(resetStateSearch());
    setSearchValue("");
  };
```
Jika user memilih lokasi dari hasil pencarian, maka akan terjadi navigasi ke halaman LocationDetail.js, dan reset state komponen. Parameter dari navigasi itu sendiri terdiri dari getGeocode, inputData dan type. getGeocode merupakan param yg berupa objek dan dibutuhkan di halaman LocationDetail.js untuk melakukan reverse geocode api call yg akan mendapatkan data lengkap dari placeId item yg dipilih (didapatkan dari hasil autoComplete google). inputData merupakan param yg dibutuhkan di halaman LocationDetail.js untuk mengisi input data yg telah dilakukan oleh user. type merupakan param yg berupa string yg berisi receiver/sender yg  dibutuhkan di halaman LocationDetail.js untuk menentukan komponen input field apa saja yg ditampilkan.



## file name
### Lifecycle
### Child Component
### Actions
