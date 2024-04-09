// styles.js

import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#007bff',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export const staffHomeStyles = StyleSheet.create({
  requestItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  requestItemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  startCompleteButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  startCompleteButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  
  },
  staffDetailsContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 5,
  },
  staffDetailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
});
