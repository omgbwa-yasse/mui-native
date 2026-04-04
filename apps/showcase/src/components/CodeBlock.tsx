import React, { memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/styles/hljs';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = memo(function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
  if (!code) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <SyntaxHighlighter
          language={language}
          style={atomOneDark}
          customStyle={styles.highlighter}
          fontSize={13}
        >
          {code}
        </SyntaxHighlighter>
      </ScrollView>
    </View>
  );
});

export default CodeBlock;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#282c34',
    maxHeight: 320,
  },
  scroll: {
    flex: 1,
  },
  highlighter: {
    padding: 12,
    margin: 0,
  },
});
