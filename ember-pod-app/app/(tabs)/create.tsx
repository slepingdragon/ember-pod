import * as Haptics from 'expo-haptics';
import { ComponentType, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GlassCard } from '@/components/GlassCard';
import {
  HoodieIcon,
  MugIcon,
  PlusIcon,
  StickerIcon,
  TshirtIcon,
} from '@/components/icons';

type IconProps = { size?: number; color?: string; strokeWidth?: number };

type ProductType = {
  id: string;
  name: string;
  Icon: ComponentType<IconProps>;
  basePrice: number;
  blurb: string;
};

const PRODUCT_TYPES: ProductType[] = [
  { id: 'tee',     name: 'T-shirt', Icon: TshirtIcon,  basePrice: 18, blurb: 'Bella+Canvas 3001' },
  { id: 'hoodie',  name: 'Hoodie',  Icon: HoodieIcon,  basePrice: 38, blurb: 'Gildan 18500'      },
  { id: 'mug',     name: 'Mug',     Icon: MugIcon,     basePrice: 12, blurb: '11oz ceramic'      },
  { id: 'sticker', name: 'Sticker', Icon: StickerIcon, basePrice: 3,  blurb: 'Die-cut vinyl'     },
];

function ProductTile({
  product,
  active,
  onPress,
}: {
  product: ProductType;
  active: boolean;
  onPress: () => void;
}) {
  const { Icon, name, blurb, basePrice } = product;
  return (
    <GlassCard strong={active} style={{ flex: 1 }} onPress={onPress}>
      <View style={{ padding: 18, minHeight: 168, justifyContent: 'space-between' }}>
        <View style={{ width: 40, height: 40 }}>
          <Icon size={40} color="#FFFFFF" />
        </View>
        <View>
          <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '800', letterSpacing: -0.4 }}>
            {name}
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 2 }}>
            {blurb}
          </Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 12,
              fontWeight: '700',
              marginTop: 8,
            }}
          >
            from ${basePrice}
          </Text>
        </View>
      </View>
    </GlassCard>
  );
}

export default function CreateScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedProduct = PRODUCT_TYPES.find((p) => p.id === selected) ?? PRODUCT_TYPES[0];
  const PreviewIcon = selectedProduct.Icon;

  const buzz = (kind: 'light' | 'medium' = 'light') => {
    if (Platform.OS === 'web') return;
    Haptics.impactAsync(
      kind === 'medium' ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light,
    ).catch(() => {});
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'transparent' }}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={{ paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 18 : 8 }}>
          <Text
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
              fontWeight: '600',
            }}
          >
            Create
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 36,
              fontWeight: '900',
              letterSpacing: -1.4,
              marginTop: 6,
              lineHeight: 40,
            }}
          >
            Pick a product.{'\n'}Drop a design.
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, marginTop: 10, lineHeight: 20 }}>
            Choose a template, then pick from your designs or generate one with AI.
          </Text>
        </View>

        {/* PRODUCT GRID */}
        <View style={{ paddingHorizontal: 20, marginTop: 28, gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {PRODUCT_TYPES.slice(0, 2).map((p) => (
              <ProductTile
                key={p.id}
                product={p}
                active={selected === p.id}
                onPress={() => {
                  buzz('medium');
                  setSelected(selected === p.id ? null : p.id);
                }}
              />
            ))}
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {PRODUCT_TYPES.slice(2, 4).map((p) => (
              <ProductTile
                key={p.id}
                product={p}
                active={selected === p.id}
                onPress={() => {
                  buzz('medium');
                  setSelected(selected === p.id ? null : p.id);
                }}
              />
            ))}
          </View>
        </View>

        {/* PREVIEW CANVAS */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <Text
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
              fontWeight: '600',
              marginBottom: 10,
            }}
          >
            Editor
          </Text>
          <GlassCard strong>
            <View style={{ padding: 22, alignItems: 'center' }}>
              <View
                style={{
                  width: '100%',
                  aspectRatio: 1,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.10)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <PreviewIcon size={140} color="rgba(255,255,255,0.85)" strokeWidth={1.25} />
                <View
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 9999,
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.15)',
                  }}
                >
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 10,
                      fontWeight: '700',
                      letterSpacing: 0.6,
                    }}
                  >
                    PREVIEW
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: '700',
                  marginTop: 18,
                  letterSpacing: -0.3,
                }}
              >
                Drag-and-drop editor — coming next
              </Text>
              <Text
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: 13,
                  textAlign: 'center',
                  marginTop: 6,
                  lineHeight: 18,
                  maxWidth: 280,
                }}
              >
                Pinch, drag, and rotate AI-generated art directly onto the product. Ships in the next update.
              </Text>
            </View>
          </GlassCard>
        </View>

        {/* DESIGN LIBRARY PREVIEW */}
        <View style={{ paddingHorizontal: 20, marginTop: 22 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: 11,
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                fontWeight: '600',
              }}
            >
              Designs
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Coming soon</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <View
                key={i}
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 14,
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.10)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PlusIcon size={22} color="rgba(255,255,255,0.25)" />
              </View>
            ))}
          </ScrollView>
          <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 10, lineHeight: 17 }}>
            Generate art with AI or browse the community library — both land here. Drag any tile onto your product to place it.
          </Text>
        </View>

        {/* CTA */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Pressable
            onPress={() => buzz('medium')}
            disabled
            style={({ pressed }) => [
              {
                backgroundColor: 'rgba(255,255,255,0.10)',
                borderRadius: 16,
                paddingVertical: 16,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.12)',
              },
              pressed && { opacity: 0.85 },
            ]}
          >
            <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, fontWeight: '700' }}>
              Open editor (coming next)
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
