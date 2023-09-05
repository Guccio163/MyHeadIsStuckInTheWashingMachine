import { View, Text } from 'react-native'
import React from 'react'
import TagsPage from '../components/mainPages/TagsPage'
import { Link, Redirect } from 'expo-router'

export default function index() {
  return (
    <Redirect href={'/home/tags'}></Redirect>
  )
}