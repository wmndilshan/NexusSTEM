import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TrackingStep } from '../types';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

interface Props {
  steps: TrackingStep[];
}

function formatDate(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-LK', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export function OrderTimeline({ steps }: Props) {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const dot = step.status === 'completed'
          ? Colors.success[500]
          : step.status === 'current'
          ? Colors.brandAccent
          : Colors.neutral[300];

        return (
          <View key={step.id} style={styles.step}>
            <View style={styles.lineCol}>
              <View style={[styles.dot, { backgroundColor: dot }, step.status === 'current' && styles.dotCurrent]} />
              {!isLast && (
                <View style={[styles.line, step.status === 'completed' && styles.lineCompleted]} />
              )}
            </View>
            <View style={[styles.content, !isLast && styles.contentSpaced]}>
              <Text style={[
                styles.label,
                step.status === 'pending' && styles.labelPending,
                step.status === 'current' && styles.labelCurrent,
              ]}>
                {step.label}
              </Text>
              <Text style={styles.description}>{step.description}</Text>
              {step.completedAt && (
                <Text style={styles.date}>{formatDate(step.completedAt)}</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 0,
  },
  step: {
    flexDirection: 'row',
    gap: 14,
  },
  lineCol: {
    alignItems: 'center',
    width: 18,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 2,
  },
  dotCurrent: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2.5,
    borderColor: Colors.brandAccent,
    backgroundColor: Colors.surface,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.neutral[200],
    marginVertical: 3,
    minHeight: 24,
  },
  lineCompleted: {
    backgroundColor: Colors.success[500],
  },
  content: {
    flex: 1,
    paddingBottom: 0,
    gap: 2,
  },
  contentSpaced: {
    paddingBottom: 20,
  },
  label: {
    ...Typography.h4,
    color: Colors.textPrimary,
  },
  labelPending: {
    color: Colors.textMuted,
    fontWeight: '400',
  },
  labelCurrent: {
    color: Colors.brandAccent,
  },
  description: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  date: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
