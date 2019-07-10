import React, { Component,useState,useEffect,useRef } from 'react';
import ReactDOM from 'react-dom';
//import GoogleMapsApiLoader from "google-maps-api-loader";
import {Map as Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


/*
// Google Mapのオブジェクトを呼び出すだけのhooks
export const useGoogleMap = apiKey => {
  
  const [googleMap, setGoogleMap] = useState(null);
  useEffect(() => {
    GoogleMapsApiLoader({ apiKey }).then(google => {
      setGoogleMap(google);
    });
  }, []); // useEffectの第二引数を[]にすることで、初回1回目だけ実行される
  return googleMap;
};

// 実際にMapをDOMにマウントする処理。
export const useMap = ({ googleMap, mapContainerRef, initialConfig }) => {
  const [map, setMap] = useState(null);
  useEffect(
    () => {
      // googleMapかmapContainerRefが初期化されてなければ何もしない
      if (!googleMap || !mapContainerRef.current) {
        return;
      }
      const map = new googleMap.maps.Map(
        mapContainerRef.current,
        initialConfig
      );
      setMap(map);
    },
    [googleMap, mapContainerRef]
  ); // initialConfigは変わったとしても再マウントするとおかしなことになるので更新対象にしない // googleMapかmapContainerRefが変化したらeffectが発火する。

  // あとで使えるようにmapを返すようにする
  return map;
};

export const useDrawMapMarkers = ({ markers, googleMap, map }) => {
  // stateだと初回描画ほ保持がうまくいかないのでここではrefを利用する
  const markerObjectsRef = useRef({});
  useEffect(
    () => {
      // 初期化がまだなら何もしない
      if (!googleMap || !map) {
        return;
      }
      const { Marker } = googleMap.maps;
      markers.map((position, i) => {
        if (markerObjectsRef.current[i]) {
          // すでに描画済みだったら何もしない。
          return;
        }
        const markerObj = new Marker({
          position,
          map,
          title: "marker!"
        });
        markerObjectsRef.current[i] = markerObj;
      });
    },
    [markers, googleMap, map]
  );
};

// markerをstate管理する
export const useMarkerState = initialMarkers => {
  const [markers, setMarkers] = useState(initialMarkers);
  // マーカーの追加処理はsetMarkersを加工する形に
  const addMarker = ({ lat, lng }) => {
    setMarkers([...markers, { lat, lng }]);
  };
  return {
    markers,
    addMarker
  };
};

// Mapがクリックされたらイベントを飛ばすhooks
export const useMapClickEvent = ({ onClickMap, googleMap, map }) => {
  useEffect(
    () => {
      const listener = googleMap.maps.event.addListener(map, "click", e => {
        console.log(e);
        onClickMap({
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        });
      });
      // onClickMapが変更されたらつくったイベントをクリアする
      //（じゃないとクリックするたびにイベントが大量閣下さえる）
      return () => {
        googleMap.maps.event.removeListener(listener);
      };
    },
    [googleMap, map, onClickMap]
  );
};




const initialConfig = {
  zoom: 12,
  center: { lat: 49, lng: 10 }
};

let initialMarkers = [
  { lat: 35.6432027, lng: 139.6729435 },
  { lat: 35.5279833, lng: 139.6989209 },
  { lat: 35.6563623, lng: 139.7215211 },
  { lat: 35.6167531, lng: 139.5469376 },
  { lat: 35.6950961, lng: 139.5037899 }
];

 

const MapMarkers = ({ googleMap, map }) => {
  // stateとして管理するマーカー
  const { markers, addMarker } = useMarkerState(initialMarkers);
  // 描画する
  useDrawMapMarkers({ markers, googleMap, map });
  // クリックイベントを追加
  useMapClickEvent({
    onClickMap: ({ lat, lng }) => {
      addMarker({ lat, lng });
    },
    map,
    googleMap
  });
  // hooksのためだけのコンポーネントになるのでこのコンポーネント自体は何も返さない。
  // nullを返すのが気持ち悪ければ`<script />`, `[]`, `""`を返すなどもアリ
  return null;
};

const WaitForMap = ({ googleMap, map, children }) => {
  if (!googleMap || !map) {
    return null;
  }
  return children;
};

*/


const Container = props => {
  if (!props.loaded) return <div>Loading...</div>;

  return (
    <Map
      centerAroundCurrentLocation
      className="map"
      google={props.google}
      style={{ height: '100%', position: 'relative', width: '100%' }}
      zoom={14}
    >
        <Marker
        name="SOMA"
        position={{ lat: 37.778519, lng: -122.40564 }}
        title="The marker`s title will appear as a tooltip."
/>
</Map>
  );
};




 
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_MAP_API_KEY)
})(Container)