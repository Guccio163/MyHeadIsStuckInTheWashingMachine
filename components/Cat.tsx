import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import PageTitle from './PageTitle';
import UserInfoPage from './UserInfoPage';

interface Props{
    name: string;
}

export default function Cat({name}:Props) {

    const [isPurring, setPurring] = useState(false);

  return (
    <>
    <View>
      <Text>
        {name}: {isPurring ? "purr" : "meow"}{" "}
      </Text>
      <Button
        title={'Press to stroke the kitten'}
        onPress={() => setPurring(true)}
      />
    </View>
    </>
  );
}