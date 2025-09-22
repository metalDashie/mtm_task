import React, { FC, PropsWithChildren } from 'react';
import Header, { IHeaderProps } from '../../components/header/header.tsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

interface IProps extends PropsWithChildren {
  headerProps?: IHeaderProps;
}
const ScreenWrapper: FC<IProps> = ({ children, headerProps }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {headerProps && <Header {...headerProps} />}
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenWrapper;
