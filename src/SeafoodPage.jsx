import React, { useState, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { Search, ChevronRight, X, Fish, Shell, MapPin, ChefHat, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme-toggle';

import { cn } from "@/lib/utils";

// ==========================================
// 1. 数据源 (超过100种海鲜数据的子集，用于演示双粘滞和滚动)
// ==========================================
const CATEGORIES = [
  { id: 'shrimp', name: '虾类大全', icon: <span className="text-xl">🦐</span> },
  { id: 'crab', name: '螃蟹名录', icon: <span className="text-xl">🦀</span> },
  { id: 'fish', name: '鱼类图鉴', icon: <span className="text-xl">🐟</span> },
  { id: 'shell', name: '极鲜贝类', icon: <span className="text-xl">🦪</span> },
  { id: 'cephalopod', name: '头足软体', icon: <span className="text-xl">🦑</span> },
  { id: 'echinoderm', name: '参胆棘皮', icon: <span className="text-xl">🥒</span> },
  { id: 'algae', name: '海产植物', icon: <span className="text-xl">🌿</span> },
  { id: 'premium', name: '顶级珍品', icon: <span className="text-xl">🦞</span> },
];

const SEAFOOD_DATA = [
  {
    "id": "s1",
    "name": "波士顿龙虾",
    "enName": "American Lobster",
    "category": "shrimp",
    "price": "¥200 - ¥400 / 斤",
    "tags": [
      "深海",
      "高蛋白",
      "宴请"
    ],
    "features": "体表光滑，有一对坚硬的大螯。",
    "pros": "肉质饱满，蛋白质极高。",
    "texture": "紧实、微甜、Q弹",
    "cooking": "清蒸、蒜蓉烤、芝士焗",
    "prompt": "Realistic scientific photography of fresh American Lobster, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20American%20Lobster%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "s2",
    "name": "南美白对虾",
    "enName": "Whiteleg shrimp",
    "category": "shrimp",
    "price": "¥30 - ¥60 / 斤",
    "tags": [
      "高性价比",
      "养殖",
      "家常"
    ],
    "features": "壳薄体肥，生命力强。",
    "pros": "出肉率高，营养极其丰富。",
    "texture": "细嫩、鲜甜",
    "cooking": "白灼、油焖、椒盐",
    "prompt": "Realistic scientific photography of fresh Whiteleg shrimp, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Whiteleg%20shrimp%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "s3",
    "name": "皮皮虾 (虾蛄)",
    "enName": "Mantis shrimp",
    "category": "shrimp",
    "price": "¥50 - ¥100 / 斤",
    "tags": [
      "野生",
      "多刺",
      "鲜美"
    ],
    "features": "外壳坚硬，有多节，形似螳螂。",
    "pros": "肉质比一般虾更鲜甜，带有独特海味。",
    "texture": "紧实弹牙，鲜香散汁",
    "cooking": "椒盐、清蒸、生腌",
    "prompt": "Realistic scientific photography of fresh Mantis shrimp, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Mantis%20shrimp%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "s4",
    "name": "黑虎虾",
    "enName": "Giant tiger prawn",
    "category": "shrimp",
    "price": "¥60 - ¥120 / 斤",
    "tags": [
      "烧烤",
      "高颜值",
      "个大"
    ],
    "features": "体色黑褐相间，有斑马纹。",
    "pros": "虾青素含量极高，肉质肥厚。",
    "texture": "粗犷、紧实",
    "cooking": "盐烤、蒜蓉粉丝、虾堡",
    "prompt": "Realistic scientific photography of fresh Giant tiger prawn, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Giant%20tiger%20prawn%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "s5",
    "name": "基围虾",
    "enName": "Greasyback shrimp",
    "category": "shrimp",
    "price": "¥40 - ¥80 / 斤",
    "tags": [
      "清甜",
      "薄壳",
      "鲜活"
    ],
    "features": "体色青褐，额角平直。",
    "pros": "鲜活度高，极为甘脆。",
    "texture": "鲜嫩、脆甜",
    "cooking": "白灼、爆炒、蒜蓉",
    "prompt": "Realistic scientific photography of fresh Greasyback shrimp, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Greasyback%20shrimp%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "s6",
    "name": "牡丹虾",
    "enName": "Spot prawn",
    "category": "shrimp",
    "price": "¥150 - ¥300 / 斤",
    "tags": [
      "刺身",
      "斑点",
      "名贵"
    ],
    "features": "虾身带有白色斑点，色泽红亮。",
    "pros": "甜度极高，被誉为刺身极品。",
    "texture": "软糯、极致冰甜",
    "cooking": "刺身、寿司",
    "prompt": "Realistic scientific photography of fresh Spot prawn, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Spot%20prawn%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "s7",
    "name": "阿根廷红虾",
    "enName": "Argentine red shrimp",
    "category": "shrimp",
    "price": "¥60 - ¥100 / 斤",
    "tags": [
      "深海",
      "个大",
      "野生"
    ],
    "features": "天生就是红色的，体型大。",
    "pros": "深海无污染，虾味浓郁。",
    "texture": "软绵、鲜美",
    "cooking": "盐烤、黄油煎",
    "prompt": "Realistic scientific photography of fresh Argentine red shrimp, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Argentine%20red%20shrimp%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "s8",
    "name": "甜虾",
    "enName": "Northern prawn",
    "category": "shrimp",
    "price": "¥80 - ¥150 / 斤",
    "tags": [
      "刺身",
      "日料",
      "鲜甜"
    ],
    "features": "体型较小，生食有明显甜味。",
    "pros": "含有大量游离氨基酸，造就独特甜味。",
    "texture": "软滑糯甜",
    "cooking": "刺身、盖饭",
    "prompt": "Realistic scientific photography of fresh Northern prawn, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Northern%20prawn%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "s9",
    "name": "罗氏沼虾",
    "enName": "Giant freshwater prawn",
    "category": "shrimp",
    "price": "¥40 - ¥80 / 斤",
    "tags": [
      "淡水",
      "大钳",
      "黄多"
    ],
    "features": "淡水虾之王，拥有极长的蓝色长螯。",
    "pros": "虾头饱满富含虾黄，如同蟹膏。",
    "texture": "紧实粗壮",
    "cooking": "红烧、干锅",
    "prompt": "Realistic scientific photography of fresh Giant freshwater prawn, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Giant%20freshwater%20prawn%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "s10",
    "name": "斑节对虾",
    "enName": "Kuruma prawn",
    "category": "shrimp",
    "price": "¥100 - ¥200 / 斤",
    "tags": [
      "日料",
      "天妇罗"
    ],
    "features": "体表有明显的斑纹。",
    "pros": "受热后甜度剧增。",
    "texture": "极其弹牙、甘甜",
    "cooking": "天妇罗、盐烤",
    "prompt": "Realistic scientific photography of fresh Kuruma prawn, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Kuruma%20prawn%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "c1",
    "name": "大闸蟹",
    "enName": "Chinese mitten crab",
    "category": "crab",
    "price": "¥50 - ¥300 / 只",
    "tags": [
      "湖鲜",
      "黄多",
      "时令"
    ],
    "features": "青背、白肚、金爪、黄毛。",
    "pros": "蟹黄鲜甜无比，秋季至尊风味。",
    "texture": "膏满肉肥、绵密",
    "cooking": "清蒸、熟醉",
    "prompt": "Realistic scientific photography of fresh Chinese mitten crab, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Chinese%20mitten%20crab%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "c2",
    "name": "帝王蟹",
    "enName": "Red king crab",
    "category": "crab",
    "price": "¥800 - ¥2000 / 只",
    "tags": [
      "深海",
      "巨大",
      "宴席"
    ],
    "features": "体型巨大，三对长行足和一对螯。",
    "pros": "极其饱满的蟹腿肉，鲜甜爆汁。",
    "texture": "一丝丝肌肉纹理，极致鲜甜",
    "cooking": "清蒸、芝士焗、炭烤",
    "prompt": "Realistic scientific photography of fresh Red king crab, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Red%20king%20crab%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "c3",
    "name": "梭子蟹",
    "enName": "Swimming crab",
    "category": "crab",
    "price": "¥40 - ¥100 / 斤",
    "tags": [
      "海鲜",
      "家常",
      "平价"
    ],
    "features": "甲壳呈梭子形，两侧有长棘。",
    "pros": "沿海居民的餐桌常客，肉多鲜甜。",
    "texture": "松软鲜甜",
    "cooking": "姜葱炒、清蒸",
    "prompt": "Realistic scientific photography of fresh Swimming crab, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Swimming%20crab%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "c4",
    "name": "面包蟹",
    "enName": "Edible crab",
    "category": "crab",
    "price": "¥80 - ¥150 / 斤",
    "tags": [
      "黄多",
      "重壳",
      "膏蟹"
    ],
    "features": "壳极厚重呈椭圆形，蟹黄致密。",
    "pros": "膏蟹中的王者，满满的蟹膏极其满足。",
    "texture": "蟹膏极硬实浓郁",
    "cooking": "清蒸、咖喱蟹",
    "prompt": "Realistic scientific photography of fresh Edible crab, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Edible%20crab%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "c5",
    "name": "青蟹",
    "enName": "Mud crab",
    "category": "crab",
    "price": "¥90 - ¥180 / 斤",
    "tags": [
      "生猛",
      "大螯",
      "膏黄"
    ],
    "features": "青绿光泽外壳，分膏蟹和肉蟹。",
    "pros": "蟹肉结实，膏似咸蛋黄般沙糯。",
    "texture": "强韧、浓香",
    "cooking": "清蒸、蟹肉煲、红鲟米糕",
    "prompt": "Realistic scientific photography of fresh Mud crab, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Mud%20crab%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "c6",
    "name": "珍宝蟹",
    "enName": "Dungeness crab",
    "category": "crab",
    "price": "¥150 - ¥250 / 斤",
    "tags": [
      "纯肉",
      "鲜甜",
      "丰满"
    ],
    "features": "大而多肉，出肉率极高（高达25%）。",
    "pros": "肉质极为鲜美细腻，非常受欢迎。",
    "texture": "丝滑紧致",
    "cooking": "清蒸、蒜蓉",
    "prompt": "Realistic scientific photography of fresh Dungeness crab, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Dungeness%20crab%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "c7",
    "name": "雪蟹 (松叶蟹)",
    "enName": "Snow crab",
    "category": "crab",
    "price": "¥150 - ¥300 / 斤",
    "tags": [
      "日料",
      "长腿",
      "甘甜"
    ],
    "features": "腿长且细，蟹肉如雪花般洁白。",
    "pros": "冬季美味，适合用来做蟹肉火锅。",
    "texture": "极其细腻、水润甘甜",
    "cooking": "刺身、涮锅",
    "prompt": "Realistic scientific photography of fresh Snow crab, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Snow%20crab%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "c8",
    "name": "红毛蟹",
    "enName": "Horsehair crab",
    "category": "crab",
    "price": "¥300 - ¥500 / 只",
    "tags": [
      "名贵",
      "毛茸",
      "蟹膏"
    ],
    "features": "通体长满短毛的日本名蟹。",
    "pros": "虽然个头不大，蟹膏却像海胆般浓厚。",
    "texture": "细腻软绵",
    "cooking": "原只煮、清蒸",
    "prompt": "Realistic scientific photography of fresh Horsehair crab, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Horsehair%20crab%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "c9",
    "name": "软壳蟹",
    "enName": "Soft-shell crab",
    "category": "crab",
    "price": "¥80 - ¥120 / 斤",
    "tags": [
      "连壳吃",
      "酥脆"
    ],
    "features": "刚刚褪壳的蟹，全身只有一层软膜。",
    "pros": "无需剥壳，整个油炸后极度酥脆。",
    "texture": "外酥里嫩",
    "cooking": "酥炸软壳蟹",
    "prompt": "Realistic scientific photography of fresh Soft-shell crab, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Soft-shell%20crab%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "f1",
    "name": "大黄鱼",
    "enName": "Large yellow croaker",
    "category": "fish",
    "price": "¥40 - ¥80 / 斤(养殖)",
    "tags": [
      "名贵",
      "细嫩",
      "金黄"
    ],
    "features": "体型修长，通体金黄。",
    "pros": "肉质呈蒜瓣状，极度细嫩。",
    "texture": "入口即化",
    "cooking": "清蒸、红烧",
    "prompt": "Realistic scientific photography of fresh Large yellow croaker, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Large%20yellow%20croaker%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "f2",
    "name": "三文鱼",
    "enName": "Salmon",
    "category": "fish",
    "price": "¥80 - ¥150 / 斤",
    "tags": [
      "刺身",
      "欧米伽-3",
      "橙红肉"
    ],
    "features": "肉质橙红，有清晰的白色脂肪纹。",
    "pros": "富含不饱和脂肪酸，生食极为鲜美。",
    "texture": "丰腴软糯，脂香浓郁",
    "cooking": "刺身、香煎",
    "prompt": "Realistic scientific photography of fresh Salmon, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Salmon%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "f3",
    "name": "石斑鱼",
    "enName": "Grouper",
    "category": "fish",
    "price": "¥80 - ¥300 / 斤",
    "tags": [
      "深海",
      "宴席",
      "紧实"
    ],
    "features": "体型短胖，嘴大，身上有斑点。",
    "pros": "鱼皮富含胶质，极其爽脆。",
    "texture": "Q弹有嚼劲",
    "cooking": "清蒸、生炒鱼片",
    "prompt": "Realistic scientific photography of fresh Grouper, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Grouper%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "f4",
    "name": "秋刀鱼",
    "enName": "Pacific saury",
    "category": "fish",
    "price": "¥10 - ¥20 / 斤",
    "tags": [
      "平价",
      "烧烤",
      "细长"
    ],
    "features": "体型细长似刀。",
    "pros": "便宜又好吃的代表。",
    "texture": "带有特殊的微苦甘甜",
    "cooking": "盐烤",
    "prompt": "Realistic scientific photography of fresh Pacific saury, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Pacific%20saury%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "f5",
    "name": "龙胆石斑",
    "enName": "Giant grouper",
    "category": "fish",
    "price": "¥150 - ¥300 / 斤",
    "tags": [
      "高黏",
      "巨大"
    ],
    "features": "可以长到百斤的重型石斑鱼。",
    "pros": "胶原蛋白极多。",
    "texture": "鱼皮极其厚重Q弹",
    "cooking": "清炖、红烧",
    "prompt": "Realistic scientific photography of fresh Giant grouper, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Giant%20grouper%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "f6",
    "name": "多宝鱼",
    "enName": "Turbot",
    "category": "fish",
    "price": "¥30 - ¥60 / 斤",
    "tags": [
      "无细刺",
      "扁鱼"
    ],
    "features": "身体扁平，适合带老人小孩食用。",
    "pros": "清甜无刺，家庭宴席常客。",
    "texture": "柔滑顺口",
    "cooking": "清蒸、干煎",
    "prompt": "Realistic scientific photography of fresh Turbot, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Turbot%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "f7",
    "name": "银鳕鱼",
    "enName": "Sablefish",
    "category": "fish",
    "price": "¥150 - ¥250 / 斤",
    "tags": [
      "高油",
      "无刺",
      "辅食"
    ],
    "features": "肉质极白，油脂多。",
    "pros": "被广泛作为儿童辅食的高端鱼类。",
    "texture": "如丝绸般滑顺爆油",
    "cooking": "香煎、味增烤",
    "prompt": "Realistic scientific photography of fresh Sablefish, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Sablefish%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "f8",
    "name": "海鲈鱼",
    "enName": "Sea bass",
    "category": "fish",
    "price": "¥20 - ¥40 / 斤",
    "tags": [
      "高蛋白",
      "白肉"
    ],
    "features": "带有黑色斑点。",
    "pros": "性价比极高。",
    "texture": "扎实鲜香",
    "cooking": "清蒸、烤鱼",
    "prompt": "Realistic scientific photography of fresh Sea bass, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Sea%20bass%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "f9",
    "name": "金目鲷",
    "enName": "Splendid alfonsino",
    "category": "fish",
    "price": "¥200 - ¥400 / 斤",
    "tags": [
      "鲜红",
      "大眼",
      "日料"
    ],
    "features": "鲜红色深海鱼，眼睛金色巨大。",
    "pros": "高级日料店名物。",
    "texture": "极其细嫩多汁",
    "cooking": "日式煮付",
    "prompt": "Realistic scientific photography of fresh Splendid alfonsino, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Splendid%20alfonsino%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "f10",
    "name": "带鱼",
    "enName": "Hairtail",
    "category": "fish",
    "price": "¥20 - ¥50 / 斤",
    "tags": [
      "扁长",
      "家常"
    ],
    "features": "表面银色，如刀片般锐利长形。",
    "pros": "肉丝细腻容易脱骨。",
    "texture": "鲜香满分",
    "cooking": "干炸、红烧",
    "prompt": "Realistic scientific photography of fresh Hairtail, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Hairtail%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "sh1",
    "name": "生蚝 (牡蛎)",
    "enName": "Oyster",
    "category": "shell",
    "price": "¥30 - ¥100 / 斤",
    "tags": [
      "海中牛奶",
      "补锌",
      "经典"
    ],
    "features": "外壳粗糙不对称。",
    "pros": "营养丰富，特别是锌含量极高。",
    "texture": "肥美多汁，软滑爆浆",
    "cooking": "生食、蒜蓉烤",
    "prompt": "Realistic scientific photography of fresh Oyster, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Oyster%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "sh2",
    "name": "扇贝",
    "enName": "Scallop",
    "category": "shell",
    "price": "¥20 - ¥60 / 斤",
    "tags": [
      "瑶柱",
      "鲜美",
      "百搭"
    ],
    "features": "呈扇形外壳，内有巨大的闭壳肌。",
    "pros": "极其甘甜，闭壳肌口感绝佳。",
    "texture": "紧实弹牙",
    "cooking": "蒜蓉粉丝烤/蒸",
    "prompt": "Realistic scientific photography of fresh Scallop, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Scallop%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "sh3",
    "name": "花甲 (菲律宾蛤仔)",
    "enName": "Manila clam",
    "category": "shell",
    "price": "¥10 - ¥20 / 斤",
    "tags": [
      "夜宵",
      "平价",
      "下酒"
    ],
    "features": "壳上有丰富花纹，生命力极强。",
    "pros": "最亲民的大众小海鲜。",
    "texture": "软嫩鲜滑",
    "cooking": "爆炒、花甲粉",
    "prompt": "Realistic scientific photography of fresh Manila clam, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Manila%20clam%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "sh4",
    "name": "贻贝 (青口/淡菜)",
    "enName": "Mussel",
    "category": "shell",
    "price": "¥10 - ¥30 / 斤",
    "tags": [
      "法餐",
      "黑壳",
      "营养"
    ],
    "features": "黑褐色的极薄外壳，边缘呈青绿色。",
    "pros": "法式白葡萄酒贻贝的首选之材。",
    "texture": "口感松软醇厚",
    "cooking": "白葡萄酒焗、清蒸",
    "prompt": "Realistic scientific photography of fresh Mussel, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Mussel%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "sh5",
    "name": "文蛤",
    "enName": "Hard clam",
    "category": "shell",
    "price": "¥15 - ¥30 / 斤",
    "tags": [
      "天下第一鲜",
      "厚壳",
      "汤鲜"
    ],
    "features": "外壳厚实，呈三角形，有极美的自然花纹。",
    "pros": "“天下第一鲜”，熬汤的极致法宝。",
    "texture": "肉质极韧弹",
    "cooking": "蒸蛋、豆腐汤",
    "prompt": "Realistic scientific photography of fresh Hard clam, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Hard%20clam%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "sh6",
    "name": "蛏子王",
    "enName": "Razor clam",
    "category": "shell",
    "price": "¥20 - ¥50 / 斤",
    "tags": [
      "修长",
      "泥沙",
      "入味"
    ],
    "features": "外壳颜色呈黄褐色，形如竹节且长。",
    "pros": "吸收汤汁能力极强，炒制无比入味。",
    "texture": "脆口韧劲",
    "cooking": "葱油爆炒、铁板",
    "prompt": "Realistic scientific photography of fresh Razor clam, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Razor%20clam%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "sh7",
    "name": "象拔蚌",
    "enName": "Geoduck",
    "category": "shell",
    "price": "¥200 - ¥500 / 斤",
    "tags": [
      "巨大",
      "高档",
      "刺身"
    ],
    "features": "虹吸管巨大，形似象鼻。",
    "pros": "清甜度极高，无腥味。",
    "texture": "脆嫩无匹，极度鲜甜",
    "cooking": "切片刺身、煮粥",
    "prompt": "Realistic scientific photography of fresh Geoduck, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Geoduck%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "sh8",
    "name": "鸟贝",
    "enName": "Cockle",
    "category": "shell",
    "price": "¥40 - ¥80 / 斤",
    "tags": [
      "鸟头",
      "脆弹",
      "凉拌"
    ],
    "features": "足部红白相间伸出极长，宛如小鸟的头颈。",
    "pros": "极其爽脆的口感使其成为凉拌之王。",
    "texture": "极度脆爽有嚼劲",
    "cooking": "温拌、白灼",
    "prompt": "Realistic scientific photography of fresh Cockle, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Cockle%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "sh9",
    "name": "珍珠贝",
    "enName": "Pearl oyster",
    "category": "shell",
    "price": "¥50 - ¥100 / 斤",
    "tags": [
      "产珠",
      "鲜甜"
    ],
    "features": "内侧含有美丽的贝母层。",
    "pros": "其瑶柱极度鲜甜。",
    "texture": "紧致弹牙",
    "cooking": "刺身",
    "prompt": "Realistic scientific photography of fresh Pearl oyster, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Pearl%20oyster%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "sh10",
    "name": "竹蛏",
    "enName": "Jackknife clam",
    "category": "shell",
    "price": "¥30 - ¥60 / 斤",
    "tags": [
      "笔直",
      "夜宵"
    ],
    "features": "笔直如竹管一样的长形贝类。",
    "pros": "肉质细长。",
    "texture": "非常弹牙入味",
    "cooking": "爆炒",
    "prompt": "Realistic scientific photography of fresh Jackknife clam, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Jackknife%20clam%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "ce1",
    "name": "章鱼 (八爪鱼)",
    "enName": "Octopus",
    "category": "cephalopod",
    "price": "¥30 - ¥60 / 斤",
    "tags": [
      "八爪",
      "高智商",
      "口感"
    ],
    "features": "八条腕足，无骨极其柔软。",
    "pros": "在各种日式料理和韩式活吞中占有一席之地。",
    "texture": "极其强韧、弹性极高",
    "cooking": "刺身、铁板烧、凉拌",
    "prompt": "Realistic scientific photography of fresh Octopus, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Octopus%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "ce2",
    "name": "鱿鱼",
    "enName": "Squid",
    "category": "cephalopod",
    "price": "¥15 - ¥30 / 斤",
    "tags": [
      "十腕",
      "夜宵",
      "管状"
    ],
    "features": "体成圆锥形管状，头部有十条触须。",
    "pros": "铁板鱿鱼是夜市里永不缺席的主角。",
    "texture": "紧实脆口",
    "cooking": "铁板烧、爆炒、干煸",
    "prompt": "Realistic scientific photography of fresh Squid, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Squid%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "ce3",
    "name": "墨鱼 (乌贼)",
    "enName": "Cuttlefish",
    "category": "cephalopod",
    "price": "¥20 - ¥40 / 斤",
    "tags": [
      "墨汁",
      "硬螵",
      "宽体"
    ],
    "features": "身体扁平，内含一枚石灰质硬骨，能喷墨。",
    "pros": "其墨汁常被用于高端意面及海鲜饭上色提鲜。",
    "texture": "肉质极为浑厚扎实",
    "cooking": "红烧、爆炒、墨鱼丸",
    "prompt": "Realistic scientific photography of fresh Cuttlefish, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Cuttlefish%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "ce4",
    "name": "望潮 (小章鱼)",
    "enName": "Webfoot octopus",
    "category": "cephalopod",
    "price": "¥60 - ¥100 / 斤",
    "tags": [
      "小巧",
      "海滩",
      "脆嫩"
    ],
    "features": "体型非常小，经常在退潮后的泥滩活动。",
    "pros": "被广泛用做清代著名海产。",
    "texture": "极端脆爽",
    "cooking": "红烧、白灼",
    "prompt": "Realistic scientific photography of fresh Webfoot octopus, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Webfoot%20octopus%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "ce5",
    "name": "锁管 (小管)",
    "enName": "Mitre squid",
    "category": "cephalopod",
    "price": "¥40 - ¥80 / 斤",
    "tags": [
      "白灼",
      "透亮"
    ],
    "features": "夏夜海钓的热门品种，身体半透明发光。",
    "pros": "极致讲究鲜度。",
    "texture": "甘甜脆生",
    "cooking": "白灼、生食",
    "prompt": "Realistic scientific photography of fresh Mitre squid, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Mitre%20squid%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "ce6",
    "name": "枪乌贼 (透抽)",
    "enName": "Swordtip squid",
    "category": "cephalopod",
    "price": "¥40 - ¥90 / 斤",
    "tags": [
      "长形",
      "透明"
    ],
    "features": "形如长枪般修长的鱿鱼品种。",
    "pros": "口感层次丰富。",
    "texture": "兼具柔嫩与嚼劲",
    "cooking": "三杯、炒肉",
    "prompt": "Realistic scientific photography of fresh Swordtip squid, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Swordtip%20squid%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "ec1",
    "name": "辽刺参 (海参)",
    "enName": "Sea cucumber",
    "category": "echinoderm",
    "price": "¥1000 - ¥3000 / 斤",
    "tags": [
      "海八珍",
      "刺状",
      "滋补"
    ],
    "features": "呈圆筒海带状，长满肉质突刺。",
    "pros": "中国传统滋补佳品，极高的食疗价值。",
    "texture": "极其爽滑Q弹、无形无味但极度吸汁",
    "cooking": "葱烧海参、炖汤",
    "prompt": "Realistic scientific photography of fresh Sea cucumber, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Sea%20cucumber%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "ec2",
    "name": "紫海胆",
    "enName": "Purple sea urchin",
    "category": "echinoderm",
    "price": "¥80 - ¥200 / 盒",
    "tags": [
      "黑刺",
      "甘甜"
    ],
    "features": "外表呈深紫色或黑色，遍布长刺。",
    "pros": "海胆黄肥美，夏天最当季的至高享受。",
    "texture": "如黄油般绵密顺滑",
    "cooking": "海胆刺身、寿司",
    "prompt": "Realistic scientific photography of fresh Purple sea urchin, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Purple%20sea%20urchin%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "ec3",
    "name": "马粪海胆",
    "enName": "Bafun uni",
    "category": "echinoderm",
    "price": "¥800 - ¥2000 / 盒",
    "tags": [
      "极品甜",
      "短刺"
    ],
    "features": "刺短且颜色深浅不一。",
    "pros": "相比紫海胆，甜度极其浓缩。",
    "texture": "入口即化，爆炸级甘甜",
    "cooking": "盖饭、刺身",
    "prompt": "Realistic scientific photography of fresh Bafun uni, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Bafun%20uni%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "ec4",
    "name": "海星",
    "enName": "Starfish",
    "category": "echinoderm",
    "price": "¥10 - ¥30 / 只",
    "tags": [
      "五角星",
      "硬壳",
      "鲜汤"
    ],
    "features": "五芒星状，体表有粗糙颗粒。",
    "pros": "其生殖腺可以食用，也可以用来炖汤提鲜。",
    "texture": "粗糙颗粒感、蟹黄风味",
    "cooking": "蒸煮、炖汤",
    "prompt": "Realistic scientific photography of fresh Starfish, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Starfish%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "ec5",
    "name": "梅花参",
    "enName": "Pineapple sea cucumber",
    "category": "echinoderm",
    "price": "¥500 - ¥1500 / 斤",
    "tags": [
      "硕大",
      "名贵"
    ],
    "features": "海参中的巨无霸，背部有类似梅花的突起。",
    "pros": "大型宴席的顶级硬菜主料。",
    "texture": "肉质极厚，口感极其粗犷胶浓",
    "cooking": "鲍汁红烧",
    "prompt": "Realistic scientific photography of fresh Pineapple sea cucumber, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Pineapple%20sea%20cucumber%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "al1",
    "name": "海带 (昆布)",
    "enName": "Kelp",
    "category": "algae",
    "price": "¥5 - ¥15 / 斤",
    "tags": [
      "煲汤",
      "碘含量高"
    ],
    "features": "属于超长褐藻，叶片巨大宽厚。",
    "pros": "“海之味”的物理具象化物，高光吊汤材料。",
    "texture": "极韧带有黏液",
    "cooking": "凉拌、炖排骨、熬高汤",
    "prompt": "Realistic scientific photography of fresh Kelp, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Kelp%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "al2",
    "name": "紫菜",
    "enName": "Laver",
    "category": "algae",
    "price": "¥10 - ¥30 / 斤",
    "tags": [
      "平价",
      "随手泡"
    ],
    "features": "呈现暗紫色的薄膜状海藻。",
    "pros": "最家常的海鲜汤材料。",
    "texture": "入口极其顺滑柔软",
    "cooking": "紫菜蛋花汤、烤海苔",
    "prompt": "Realistic scientific photography of fresh Laver, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Laver%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "al3",
    "name": "海葡萄 (长茎葡萄蕨藻)",
    "enName": "Sea grapes",
    "category": "algae",
    "price": "¥80 - ¥150 / 斤",
    "tags": [
      "绿色鱼子酱",
      "冲绳",
      "爆破感"
    ],
    "features": "串状，上面有晶莹剔透充满液体的绿色小球。",
    "pros": "素食里的鱼子酱，非常高级。",
    "texture": "在嘴里爆破的无穷快感，咸鲜清爽",
    "cooking": "直接生食、蘸醋",
    "prompt": "Realistic scientific photography of fresh Sea grapes, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Sea%20grapes%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "al4",
    "name": "裙带菜",
    "enName": "Wakame",
    "category": "algae",
    "price": "¥15 - ¥30 / 斤",
    "tags": [
      "日料",
      "凉拌"
    ],
    "features": "叶片有着像是裙摆一样的波浪弯曲。",
    "pros": "日式味增汤必备，富含钙质。",
    "texture": "厚实又脆生",
    "cooking": "凉拌裙带菜、味增汤",
    "prompt": "Realistic scientific photography of fresh Wakame, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Wakame%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "al5",
    "name": "石花菜",
    "enName": "Agarophyton",
    "category": "algae",
    "price": "¥20 - ¥50 / 斤",
    "tags": [
      "凝胶",
      "甜品"
    ],
    "features": "紫红色多分枝的藻类。",
    "pros": "可以熬制出天然的植物明胶，制造海石花甜品。",
    "texture": "极其脆嫩爽口",
    "cooking": "凉拌、熬制石花膏",
    "prompt": "Realistic scientific photography of fresh Agarophyton, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Agarophyton%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "al6",
    "name": "龙须菜",
    "enName": "Gracilaria",
    "category": "algae",
    "price": "¥15 - ¥40 / 斤",
    "tags": [
      "细丝",
      "清凉"
    ],
    "features": "如龙须般细长的红色或绿色海藻。",
    "pros": "极其清爽的凉拌菜。",
    "texture": "极致爽脆",
    "cooking": "凉拌",
    "prompt": "Realistic scientific photography of fresh Gracilaria, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Gracilaria%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "p1",
    "name": "蓝鳍金枪鱼 (大腹)",
    "enName": "Bluefin Tuna Otoro",
    "category": "premium",
    "price": "¥1500 - ¥3000 / 斤",
    "tags": [
      "顶级刺身",
      "大腹",
      "海中和牛"
    ],
    "features": "金枪鱼中最为名贵的蓝鳍种，油脂极其丰富的前腹壁。",
    "pros": "被誉为生鱼片之王的大腹部位，脂肪如雪花般。",
    "texture": "入口即化，脂香四溢",
    "cooking": "刺身、顶级寿司",
    "prompt": "Realistic scientific photography of fresh Bluefin Tuna Otoro, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Bluefin%20Tuna%20Otoro%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "p2",
    "name": "俄罗斯大白鳇鱼子酱",
    "enName": "Beluga Caviar",
    "category": "premium",
    "price": "¥2000 - ¥5000 / 10g",
    "tags": [
      "黑金",
      "奢华",
      "西餐三大珍"
    ],
    "features": "取自里海与黑海的大白鳇（Beluga），颗粒极大。",
    "pros": "世界上最昂贵的食材之一，西方上流社会标配。",
    "texture": "在舌尖爆裂迸发坚果与黄油香",
    "cooking": "直接食用(珍珠贝勺)",
    "prompt": "Realistic scientific photography of fresh Beluga Caviar, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Beluga%20Caviar%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "p3",
    "name": "野生大黄鱼",
    "enName": "Wild large yellow croaker",
    "category": "premium",
    "price": "¥2000 - ¥10000+ / 斤",
    "tags": [
      "有市无价",
      "土豪",
      "极鲜"
    ],
    "features": "纯正野生海捕大黄鱼，唇红鳃鲜，肚皮金光闪闪。",
    "pros": "有钱难买到的极净海鲜味，远非养殖可比。",
    "texture": "绝顶细嫩，鲜美无穷",
    "cooking": "清蒸、雪菜烧",
    "prompt": "Realistic scientific photography of fresh Wild large yellow croaker, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Wild%20large%20yellow%20croaker%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "p4",
    "name": "澳洲皇帝蟹 (塔斯马尼亚巨蟹)",
    "enName": "Tasmanian giant crab",
    "category": "premium",
    "price": "¥5000 - ¥20000 / 只",
    "tags": [
      "巨无霸",
      "红白"
    ],
    "features": "世界上重量最大的蟹类之一。",
    "pros": "蟹螯硕大无穷，肉质异常丰满。",
    "texture": "肉质如大块鸡肉般过瘾",
    "cooking": "清蒸、焗烤",
    "prompt": "Realistic scientific photography of fresh Tasmanian giant crab, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Tasmanian%20giant%20crab%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "p5",
    "name": "布列塔尼蓝龙虾",
    "enName": "Blue lobster",
    "category": "premium",
    "price": "¥600 - ¥1200 / 斤",
    "tags": [
      "基因变异",
      "高贵"
    ],
    "features": "极为罕见的蓝色龙虾变异种。",
    "pros": "高级法餐常客。",
    "texture": "醇厚的龙虾冰弹肉感",
    "cooking": "白灼、法式浓汤",
    "prompt": "Realistic scientific photography of fresh Blue lobster, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Blue%20lobster%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "p6",
    "name": "顶级花胶 (鳘鱼胶)",
    "enName": "Premium fish maw",
    "category": "premium",
    "price": "¥10000+ / 斤",
    "tags": [
      "海八珍",
      "胶原蛋白"
    ],
    "features": "名贵鳘鱼的大型干制鱼鳔。",
    "pros": "中国饮食文化顶端极其名贵的补品。",
    "texture": "极度柔滑胶黏",
    "cooking": "浓汤熬煮",
    "prompt": "Realistic scientific photography of fresh Premium fish maw, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Premium%20fish%20maw%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },
  {
    "id": "p7",
    "name": "西班牙红魔虾",
    "enName": "Carabineros prawn",
    "category": "premium",
    "price": "¥500 - ¥1000 / 斤",
    "tags": [
      "米其林",
      "虾脑汁"
    ],
    "features": "天生就是如同恶魔般的血红色。",
    "pros": "充满浓烈海味精华的虾头汤汁。",
    "texture": "绝巅的浓郁海鲜味",
    "cooking": "吸吮虾脑、铁板煎烤",
    "prompt": "Realistic scientific photography of fresh Carabineros prawn, seafood, pure white clean studio background, high resolution, 8k, extreme detail, photorealistic",
    "baikeImg": "https://image.pollinations.ai/prompt/Realistic%20scientific%20photography%20of%20fresh%20Carabineros%20prawn%2C%20seafood%2C%20pure%20white%20clean%20studio%20background%2C%20high%20resolution%2C%208k%2C%20extreme%20detail%2C%20photorealistic?width=800&height=600&nologo=true"
  },

  // ========== 虾类新增 ==========
  {
    "id": "jiujie",
    "name": "九节虾",
    "enName": "Bamboo Shrimp",
    "category": "shrimp",
    "price": "¥120 - ¥260 / 斤",
    "tags": ["紧实", "广东", "花纹"],
    "features": "九道明显的横向花纹均匀排布，视觉识别度极高。",
    "pros": "广东名产，爽脆度在对虾中名列前茅，蒸熟后色泽艳丽。",
    "texture": "爽脆有力，咬下有清脆感",
    "cooking": "白灼、蒜蓉蒸",
    "prompt": "Bamboo Shrimp, striped pattern, white background, studio lighting.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/a08b87d6277f9e2f465c40021630e924b899f36f"
  },
  {
    "id": "scampi",
    "name": "南极鳌虾",
    "enName": "NZ Scampi",
    "category": "shrimp",
    "price": "¥200 - ¥400 / 斤",
    "tags": ["糯甜", "极地", "深海"],
    "features": "细长蟹螯、粉橙色外壳，半透明质感晶莹剔透，产自极地深海。",
    "pros": "极地纯净深海出产，无任何污染，甜度天然极高。",
    "texture": "软糯如冰淇淋，入口即化",
    "cooking": "顶级刺身、清水白灼",
    "prompt": "NZ Scampi raw, crystalline flesh, pink shell, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/9c16fdfaaf51f3de9c82806504eef01f3a29792a"
  },
  {
    "id": "flower_lobster",
    "name": "锦绣龙虾",
    "enName": "Ornate Spiny Lobster",
    "category": "shrimp",
    "price": "¥400 - ¥900 / 斤",
    "tags": ["霸气", "刺身", "高颜值"],
    "features": "色彩斑斓，体型巨大，背壳布满锦绣花纹，颜值为龙虾之冠。",
    "pros": "外观最华丽的龙虾，同时肉质极其鲜甜脆嫩，宴席首选。",
    "texture": "脆、甜、厚，带有清正的海甜",
    "cooking": "刺身、上汤焗、蒜蓉蒸",
    "prompt": "Ornate spiny lobster, colorful patterns, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/314e251f95cad1c80650965e753e6709c93d511a"
  },
  {
    "id": "mozambique",
    "name": "莫桑比克对虾",
    "enName": "Mozambique Prawn",
    "category": "shrimp",
    "price": "¥150 - ¥300 / 斤",
    "tags": ["深红", "紧致", "野生"],
    "features": "通体暗红色，形体修长，属野生海捕品种，肉质非常扎实。",
    "pros": "纯野生捕捞，鲜味纯正无杂质，弹性超越养殖虾。",
    "texture": "弹性十足，咬感极为扎实",
    "cooking": "干煎、盐烤、铁板",
    "prompt": "Mozambique prawn raw, dark red, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/f31fbe096b63f624458392578744ebf81a4c5148"
  },
  {
    "id": "rock_shrimp",
    "name": "岩虾",
    "enName": "Rock Shrimp",
    "category": "shrimp",
    "price": "¥80 - ¥160 / 斤",
    "tags": ["壳硬", "龙虾口感", "深海"],
    "features": "外壳坚硬如岩石，体型短粗，处理困难但肉质令人惊喜。",
    "pros": "去壳后肉质口感神似小龙虾，性价比相当高。",
    "texture": "坚实Q弹，有厚实感",
    "cooking": "爆炒、油炸、蒜蓉",
    "prompt": "Rock shrimp de-shelled meat, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/5bafa40f4bfbfbed981b7e417ef0f736aec31f3e"
  },
  {
    "id": "river_prawn",
    "name": "河虾",
    "enName": "River Shrimp",
    "category": "shrimp",
    "price": "¥45 - ¥95 / 斤",
    "tags": ["清甜", "江南", "淡水"],
    "features": "体小，青色半透明，额角细长，江南水乡特产。",
    "pros": "汤鲜味美，龙井虾仁的主角，江南饮食文化代表之一。",
    "texture": "极嫩，入口轻柔细腻",
    "cooking": "油爆、龙井虾仁、盐水",
    "prompt": "Small river shrimp, greenish translucent, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/79f0f736afc37931c8906326e1c4b74542a911e7"
  },
  {
    "id": "glass_shrimp",
    "name": "玻璃虾",
    "enName": "Ghost Shrimp",
    "category": "shrimp",
    "price": "¥20 - ¥40 / 斤",
    "tags": ["透明", "鲜活", "晶莹"],
    "features": "身体近乎完全透明，可透过外壳看到内脏，极具视觉冲击力。",
    "pros": "物美价廉，鲜活状态极鲜，处理简单。",
    "texture": "脆而鲜，口感轻盈",
    "cooking": "盐水焯、白灼",
    "prompt": "Transparent glass shrimp, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/8c1001e93901213f8687799d54e736d12f2e9569"
  },

  // ========== 蟹类新增 ==========
  {
    "id": "gazami",
    "name": "三疣梭子蟹",
    "enName": "Gazami Crab",
    "category": "crab",
    "price": "¥50 - ¥150 / 斤",
    "tags": ["肥美", "经典", "背三疣"],
    "features": "背部有三个明显突起（疣），是梭子蟹属的代表种，产量最大。",
    "pros": "中国近海最常见、产量最大的优质海蟹，价格实惠肉质好。",
    "texture": "丝状细腻，鲜甜饱满",
    "cooking": "清蒸、生腌、姜葱炒",
    "prompt": "Gazami Crab, three tubercles on back, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/7aec54e736d12f2eb30939104fc2d5628535e58c"
  },
  {
    "id": "spanner_crab",
    "name": "旭蟹",
    "enName": "Spanner Crab",
    "category": "crab",
    "price": "¥80 - ¥160 / 斤",
    "tags": ["甲虫形", "肉多", "特色"],
    "features": "甲壳形似大甲虫，身体扁而宽，腿短粗，形态独特。",
    "pros": "腿少但肉集中在壳内，出肉率高，无碎脚烦恼。",
    "texture": "清甜滑嫩，汁水丰盈",
    "cooking": "姜葱炒、清蒸",
    "prompt": "Spanner Crab flat shell, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/95eef01f3a292df5e0fe178229712c36afc3b3fc"
  },
  {
    "id": "blue_crab",
    "name": "蓝蟹",
    "enName": "Blue Crab",
    "category": "crab",
    "price": "¥40 - ¥90 / 斤",
    "tags": ["美式", "甜脆", "蓝螯"],
    "features": "螯肢呈明显蓝色，雌蟹腹部橙红，大西洋名产。",
    "pros": "美国东海岸传统名蟹，切萨皮克湾蓝蟹享誉世界。",
    "texture": "脆甜，肉质紧实",
    "cooking": "香料水煮、蟹饼、烩汁",
    "prompt": "Blue Crab with blue claws, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/b151f8198618367a731998592e738bd4b31ce53e"
  },
  {
    "id": "stone_crab",
    "name": "石蟹",
    "enName": "Stone Crab",
    "category": "crab",
    "price": "¥100 - ¥300 / 斤",
    "tags": ["巨螯", "黑尖", "可持续"],
    "features": "螯爪巨大且末端黑色，壳厚如石，通常只取螯爪食用。",
    "pros": "可持续采收（取爪后放回海中再生），螯肉口感似龙虾。",
    "texture": "肉质似龙虾，紧实有弹",
    "cooking": "冷盘蘸芥末、清蒸螯爪",
    "prompt": "Stone crab claw, black tip, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/4bed2e738bd4b31c26027a0f87d6277f9e2f7331"
  },
  {
    "id": "spider_crab",
    "name": "蜘蛛蟹",
    "enName": "Spider Crab",
    "category": "crab",
    "price": "¥150 - ¥400 / 斤",
    "tags": ["腿长", "深海", "清淡"],
    "features": "腿极细长多刺，甲壳呈球形，形如蜘蛛。欧洲常见高档蟹种。",
    "pros": "深海出产肉质纯净，欧洲高档餐厅常见食材。",
    "texture": "肉如细丝，味道清淡",
    "cooking": "火锅、法式海鲜汤",
    "prompt": "Spider crab long legs, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/0df431adcbef76094b3601556d81a3cc7cd98d10"
  },
  {
    "id": "golden_crab",
    "name": "黄金蟹",
    "enName": "Golden Crab",
    "category": "crab",
    "price": "¥80 - ¥180 / 只",
    "tags": ["金黄", "性价比", "膏多"],
    "features": "通体金黄，形似面包蟹但更扁平，深水海蟹，肉质饱满。",
    "pros": "出肉率稳定，蟹膏丰厚，价格适中，性价比出色。",
    "texture": "扎实丰厚，膏香浓郁",
    "cooking": "避风塘、清蒸、咖喱",
    "prompt": "Golden crab raw, bright yellow, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/d1160924ab18972b2203923ee6cd7b899e510a9a"
  },

  // ========== 鱼类新增 ==========
  {
    "id": "leopard_grouper",
    "name": "东星斑",
    "enName": "Leopard Coral Grouper",
    "category": "fish",
    "price": "¥200 - ¥450 / 斤",
    "tags": ["国宴", "喜庆", "红身白点"],
    "features": "通体鲜红色覆以密密麻麻蓝色或白色圆点，外形极为华丽。",
    "pros": "石斑鱼中品质最高贵者，国宴及高端宴席首选，寓意吉祥。",
    "texture": "肉质极其细嫩弹牙，鱼皮胶质丰富",
    "cooking": "清蒸、生炒鱼球",
    "prompt": "Red leopard coral grouper with white spots, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/e4dde71190ef76c61f23783a9d16fdfaaf516709"
  },
  {
    "id": "mandarin_fish",
    "name": "鳜鱼",
    "enName": "Mandarin Fish",
    "category": "fish",
    "price": "¥40 - ¥85 / 斤",
    "tags": ["刺少", "淡水名鱼", "松鼠型"],
    "features": "背部有黑斑，背鳍多硬刺，肉质呈蒜瓣状分布，少骨。",
    "pros": "\"西塞山前白鹭飞\"的主角，松鼠鳜鱼必用食材，淡水之极品。",
    "texture": "蒜瓣状白肉，鲜嫩无腥",
    "cooking": "松鼠鳜鱼、清蒸、红烧",
    "prompt": "Mandarin fish, black spots, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/8b82b9014a90f603730e620d3112b31bb051ed1c"
  },
  {
    "id": "monkfish",
    "name": "鮟鱇鱼",
    "enName": "Monkfish",
    "category": "fish",
    "price": "¥25 - ¥55 / 斤",
    "tags": ["海底鹅肝", "胶质", "奇形"],
    "features": "头部巨大占体型一半以上，口阔如盆，头顶有发光诱饵，外形奇特。",
    "pros": "鱼肝（鮟肝）被誉为\"海中鹅肝\"，鲜味极其浓郁，日料上品。",
    "texture": "肝部如鹅肝般绵密，鱼肉结实Q弹",
    "cooking": "鱼肝刺身、火锅、炖汤",
    "prompt": "Monkfish whole, large head, dark brown, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/14ce36d3d539b60098f9a942e150352ac75cb27e"
  },
  {
    "id": "eel",
    "name": "鳗鱼",
    "enName": "Japanese Eel",
    "category": "fish",
    "price": "¥60 - ¥130 / 斤",
    "tags": ["高蛋白", "蒲烧", "滋补"],
    "features": "长条滑腻，无鳞，脂肪丰厚分布均匀，肉量饱满。",
    "pros": "富含DHA、维生素A，是极佳的滋补食材，蒲烧鳗鱼闻香开胃。",
    "texture": "鱼皮软糯，鱼肉肥美，脂香馥郁",
    "cooking": "蒲烧、白烧、鰻鱼饭",
    "prompt": "Japanese eel grilled, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/80cb39dbb6fd526678254884aa18972bd407361a"
  },
  {
    "id": "mackerel",
    "name": "马鲛鱼",
    "enName": "Spanish Mackerel",
    "category": "fish",
    "price": "¥15 - ¥40 / 斤",
    "tags": ["刺少", "饺子馅", "鲜香"],
    "features": "纺锤体形，体侧有银灰色斑点，肉多刺少，质地扎实。",
    "pros": "中国北方沿海极受欢迎，是水饺、丸子最佳馅料，烟熏极具特色。",
    "texture": "肉质扎实紧密，鲜香浓郁",
    "cooking": "烟熏、水饺馅、红烧",
    "prompt": "Spanish mackerel whole, silver, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/b219ebc4b74543a96860d5b61e178a82b9011409"
  },
  {
    "id": "pompano",
    "name": "金鲳鱼",
    "enName": "Golden Pompano",
    "category": "fish",
    "price": "¥25 - ¥45 / 斤",
    "tags": ["无鳞", "紧实", "家常"],
    "features": "体形扁圆，金黄色无鳞，肉质厚实，处理方便。",
    "pros": "处理极为简易，无鳞无小刺，适合家庭烹饪。",
    "texture": "肉质扎实，脂肪适中",
    "cooking": "红烧、香煎、清蒸",
    "prompt": "Golden pompano fish, yellow, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/bba1cd11728b47101833075dc0ced0fdfc032338"
  },
  {
    "id": "crucian",
    "name": "鲫鱼",
    "enName": "Crucian Carp",
    "category": "fish",
    "price": "¥10 - ¥22 / 斤",
    "tags": ["奶汤", "鲜味", "淡水"],
    "features": "体小银灰，背鳍高，耐污染能力强，全国最常见淡水鱼。",
    "pros": "熬出的汤汁白如牛奶、富含鲜味氨基酸，是滋补汤之王。",
    "texture": "鱼刺较多，肉质细腻鲜甜",
    "cooking": "鲫鱼豆腐汤、红烧、香煎",
    "prompt": "Crucian carp, silver, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/f603918fa0ec08fa204ec13c59ee3d6d55fbda22"
  },
  {
    "id": "grass_carp",
    "name": "草鱼",
    "enName": "Grass Carp",
    "category": "fish",
    "price": "¥8 - ¥15 / 斤",
    "tags": ["实惠", "大体型", "百搭"],
    "features": "体型修长，体色青黄，是中国产量最大的淡水鱼品种。",
    "pros": "产量冠军，物美价廉，是酸菜鱼、水煮鱼的主力用鱼。",
    "texture": "肉质厚实耐加工",
    "cooking": "酸菜鱼、水煮鱼、红烧",
    "prompt": "Grass carp, long body, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/0ff41bd5ad6eddc451da876139dbb6fd52663363"
  },
  {
    "id": "stingray",
    "name": "鳐鱼",
    "enName": "Stingray",
    "category": "fish",
    "price": "¥20 - ¥45 / 斤",
    "tags": ["无硬骨", "软骨", "铁板"],
    "features": "体扁如扇，全身无硬骨只有软骨，独特的菱形体态。",
    "pros": "全鱼均为软骨，可整片入口，韩式铁板烤制极具特色。",
    "texture": "软骨有嚼劲，肌肉丝感绵软",
    "cooking": "韩式铁板、红烧",
    "prompt": "Stingray flat fish, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/4bed2e738bd4b31c26027a0f87d6277f9e2f7331"
  },
  {
    "id": "basa",
    "name": "巴沙鱼",
    "enName": "Basa Fish",
    "category": "fish",
    "price": "¥10 - ¥20 / 斤",
    "tags": ["无刺", "便宜", "进口"],
    "features": "淡水养殖，体型大，肌肉洁白无刺，加工切片便利。",
    "pros": "价格极低，无骨刺处理方便，是外卖水煮鱼的常用原料。",
    "texture": "质地绵软细腻",
    "cooking": "水煮鱼、香煎、麻辣烫",
    "prompt": "Basa fish fillet, white flesh, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/14ce36d3d539b60064f77c68e350352ac75cb282"
  },
  {
    "id": "barramundi",
    "name": "金目鲈",
    "enName": "Barramundi",
    "category": "fish",
    "price": "¥20 - ¥40 / 斤",
    "tags": ["刺少", "洁白", "西餐"],
    "features": "银灰色体表，鳞大，眼睛带金色反光，肉洁白无瑕。",
    "pros": "几乎无小刺，西餐核心食材，清蒸或香煎均适宜。",
    "texture": "肉质细腻油润",
    "cooking": "清蒸、香煎、西式烘烤",
    "prompt": "Barramundi whole fish, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/a08b87d6277f9e2f465c40021630e924b899f36f"
  },
  {
    "id": "bighead_carp",
    "name": "胖头鱼",
    "enName": "Bighead Carp",
    "category": "fish",
    "price": "¥8 - ¥18 / 斤",
    "tags": ["鱼头", "极鲜", "淡水"],
    "features": "头部占全身比例极大，脑部脂肪丰富，鱼身肉质相对少。",
    "pros": "鱼头汤质浓鲜美，是剁椒鱼头的专用鱼种，脑中脂肪益脑。",
    "texture": "鱼头软滑，鱼肉细嫩",
    "cooking": "剁椒鱼头、砂锅鱼头汤",
    "prompt": "Bighead carp, large head, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/d62a6059252dd42a78652496033b5bb5c9e11f7c"
  },
  {
    "id": "mullet",
    "name": "鲻鱼",
    "enName": "Grey Mullet",
    "category": "fish",
    "price": "¥15 - ¥30 / 斤",
    "tags": ["鱼籽", "乌鱼子", "近海"],
    "features": "纺锤体，眼部有厚脂眼睑，体色银灰，近海群居鱼种。",
    "pros": "其卵巢经腌制风干后可制成顶级食材\"乌鱼子\"，价格极高。",
    "texture": "肉质扎实，略带泥味",
    "cooking": "红烧、香煎，鱼卵制乌鱼子",
    "prompt": "Grey Mullet fish, silver, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/42a98226cffc1e176657922d4a90f603738de902"
  },
  {
    "id": "threadfin",
    "name": "马友鱼",
    "enName": "Threadfin",
    "category": "fish",
    "price": "¥60 - ¥150 / 斤",
    "tags": ["第一鲜", "油脂冠", "名贵"],
    "features": "胸鳍下部有多条丝状延伸物，形态独特，是极名贵的近海鱼。",
    "pros": "被誉为\"海鲜第一鲜\"，油脂含量冠绝海鱼，香煎后油脂四溢。",
    "texture": "肉质极其细腻，入口化开脂香",
    "cooking": "香煎、清蒸",
    "prompt": "Threadfin fish with whisker-like fins, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/3ac79f3df8dcd100d890f6b4738b4710b9122f3e"
  },

  // ========== 贝类新增 ==========
  {
    "id": "abalone",
    "name": "鲍鱼",
    "enName": "Abalone",
    "category": "shell",
    "price": "¥5 - ¥100+ / 只",
    "tags": ["黄金", "滋补", "海八珍"],
    "features": "单壳扁平，壳内侧呈耀眼彩虹色，足部发达可吸附礁石。",
    "pros": "中国\"海八珍\"之首，富含鲍灵素，滋补养颜名品，越大越贵。",
    "texture": "软糯有嚼劲，越嚼越鲜",
    "cooking": "鲍汁红烧、干捞、刺身",
    "prompt": "Abalone in shell, iridescent interior, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/572c11dfa9ec8a139e8020e4c703918fa1ecc0a3"
  },
  {
    "id": "blood_clam",
    "name": "血蚶",
    "enName": "Blood Clam",
    "category": "shell",
    "price": "¥25 - ¥55 / 斤",
    "tags": ["生腌", "补血", "红汁"],
    "features": "壳表有放射状棱纹，开壳后有鲜红血样液体，因此得名。",
    "pros": "生腌圣品，富含血红素铁，是潮汕、温州等地极受欢迎的生腌材料。",
    "texture": "肉质脆嫩，汁水咸鲜回甜",
    "cooking": "烫熟生食、生腌、爆炒",
    "prompt": "Blood clams open, red juice, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/0df3d7ca7bcb0a4697926b486263f6246b60af5a"
  },
  {
    "id": "ark_shell",
    "name": "赤贝",
    "enName": "Ark Shell",
    "category": "shell",
    "price": "¥40 - ¥90 / 斤",
    "tags": ["橘红", "刺身", "爽脆"],
    "features": "壳棱明显，打开后内肉呈橘红色，色泽鲜艳，是顶级刺身食材。",
    "pros": "口感极其爽脆，带有独特海甜，是日本寿司店及刺身店定番食材。",
    "texture": "血腥甜香，脆度极高",
    "cooking": "刺身、寿司、白灼",
    "prompt": "Ark shell opened, orange-red meat, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/0823dd54564e9258907865c19c82d158ccbf4e1d"
  },

  // ========== 名贵新增 ==========
  {
    "id": "napoleon_fish",
    "name": "苏眉鱼",
    "enName": "Napoleon Fish",
    "category": "premium",
    "price": "¥400 - ¥1200 / 斤",
    "tags": ["稀有", "大嘴唇", "胶质"],
    "features": "体色蓝绿渐变，额头有隆起（拿破仑帽），嘴唇厚大，生长极慢。",
    "pros": "珊瑚礁珍稀保护鱼种，人工养殖极少，肉质洁白如玉，胶质丰厚。",
    "texture": "肉质洁白细嫩，皮下胶质极丰富",
    "cooking": "清蒸、刺身",
    "prompt": "Napoleon Fish blue green hump, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/a8d3fd1f4134970a256a27e09fcad1c8a7865d25"
  },
  {
    "id": "australian_lobster",
    "name": "澳洲龙虾",
    "enName": "Australian Rock Lobster",
    "category": "premium",
    "price": "¥350 - ¥800 / 斤",
    "tags": ["霸气", "火红", "宴席"],
    "features": "通体火红色，体型巨大，无螯，靠强健的尾部游泳。",
    "pros": "宴席之王，澳洲纯净海域出产，肉量极大，是帝王蟹外另一极品。",
    "texture": "肉质脆弹，清甜鲜美",
    "cooking": "清蒸、上汤焗、刺身",
    "prompt": "Red Australian Rock Lobster, no claws, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/14ce36d3d539b60098f98761e150352ac75cb29c"
  },
  {
    "id": "puffer_fish",
    "name": "河豚",
    "enName": "Puffer Fish",
    "category": "premium",
    "price": "¥80 - ¥200 / 只",
    "tags": ["剧毒需处理", "第一鲜", "极致"],
    "features": "受惊后腹部膨胀如球，内脏含剧毒，须由专业厨师处理。",
    "pros": "\"拼死吃河豚\"，被誉为天下第一鲜，需持证上岗厨师处理方可食用。",
    "texture": "肉质极其紧致弹牙，鲜味无出其右",
    "cooking": "红烧、火锅、刺身（fugu）",
    "prompt": "Puffer fish whole, round body, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/730e0cf3d7ca7bcb0a46b0f7f2407263f6242e5a"
  },
  {
    "id": "green_abalone",
    "name": "翡翠鲍",
    "enName": "Greenlip Abalone",
    "category": "premium",
    "price": "¥150 - ¥450 / 斤",
    "tags": ["澳洲", "爽脆", "翠边"],
    "features": "足部边缘呈翠绿色，是鲍鱼中颜值最高、品质最优质的品种。",
    "pros": "澳大利亚特产，肉质比普通鲍鱼更为爽脆，色泽视觉冲击力极强。",
    "texture": "爽脆鲜嫩，比普通鲍鱼口感更弹",
    "cooking": "刺身、清蒸、鲍汁焖",
    "prompt": "Greenlip Abalone, green rim, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/4bed2e738bd4b31c26027a0f87d6277f9e2f7331"
  },
  {
    "id": "lobster_fra",
    "name": "法国布列塔尼龙虾",
    "enName": "Brittany Lobster",
    "category": "premium",
    "price": "¥500 - ¥1000 / 斤",
    "tags": ["双螯", "深蓝", "法餐圣品"],
    "features": "深蓝色两螯，产自法国布列塔尼半岛，生长于寒冷洁净大西洋。",
    "pros": "法国最顶级海鲜，带螯龙虾中口感最丰富，法式高级餐厅常客。",
    "texture": "肉质冰弹爽脆，带螯部分尤为鲜甜",
    "cooking": "法式烩汁、清蒸、黄油煎",
    "prompt": "Blue Brittany lobster with two claws, white background.",
    "baikeImg": "https://bkimg.cdn.bcebos.com/pic/14ce36d3d539b60064f77c68e150352ac75cb283"
  }
];

// ==========================================
// 2. 基础原子 UI 组件
// ==========================================

// ==========================================
// 2. 基础原子 UI 组件
// ==========================================

// 根据 item.id 自动映射到本地图片
const LOCAL_IMAGE_MAP = {
  s1: ['/images/s1_1.jpg', '/images/s1_2.jpg', '/images/s1_3.jpg'],
  s2: ['/images/s2_1.jpg', '/images/s2_2.jpg', '/images/s2_3.jpg'],
  s3: ['/images/s3_1.jpg', '/images/s3_2.jpg', '/images/s3_3.jpg'],
  s4: ['/images/s4_1.jpg', '/images/s4_2.jpg', '/images/s4_3.jpg'],
  s5: ['/images/s5_1.jpg', '/images/s5_2.jpg'],
  s6: ['/images/s6_1.jpg', '/images/s6_2.jpg', '/images/s6_3.jpg'],
  s7: ['/images/s7_1.jpg', '/images/s7_2.jpg', '/images/s7_3.jpg'],
  s8: ['/images/s8_1.jpg', '/images/s8_2.jpg', '/images/s8_3.jpg'],
  s9: ['/images/s9_1.jpg', '/images/s9_2.jpg', '/images/s9_3.jpg'],
  s10: ['/images/s10_1.jpg', '/images/s10_2.jpg', '/images/s10_3.jpg'],
  s11: ['/images/s11_1.jpg', '/images/s11_2.jpg', '/images/s11_3.jpg'],
  s12: ['/images/s12_1.jpg', '/images/s12_2.jpg', '/images/s12_3.jpg'],
  c1: ['/images/c1_1.jpg', '/images/c1_2.jpg', '/images/c1_3.jpg'],
  c2: ['/images/c2_1.jpg', '/images/c2_2.jpg', '/images/c2_3.jpg'],
  c3: ['/images/c3_1.jpg', '/images/c3_2.jpg', '/images/c3_3.jpg'],
  c4: ['/images/c4_1.jpg', '/images/c4_2.jpg', '/images/c4_3.jpg'],
  c5: ['/images/c5_1.jpg', '/images/c5_2.jpg', '/images/c5_3.jpg'],
  c6: ['/images/c6_1.jpg', '/images/c6_2.jpg', '/images/c6_3.jpg'],
  c7: ['/images/c7_1.jpg', '/images/c7_2.jpg', '/images/c7_3.jpg'],
  c8: ['/images/c8_1.jpg', '/images/c8_2.jpg', '/images/c8_3.jpg'],
  c9: ['/images/c9_1.jpg', '/images/c9_2.jpg'],
  c10: ['/images/c10_1.jpg', '/images/c10_2.jpg', '/images/c10_3.jpg'],
  c11: ['/images/c11_1.jpg'],
  c12: ['/images/c12_1.jpg', '/images/c12_2.jpg', '/images/c12_3.jpg'],
  f1: ['/images/f1_1.jpg', '/images/f1_2.jpg'],
  f2: ['/images/f2_1.jpg', '/images/f2_2.jpg', '/images/f2_3.jpg'],
  f3: ['/images/f3_1.jpg', '/images/f3_2.jpg', '/images/f3_3.jpg'],
  f4: ['/images/f4_1.jpg', '/images/f4_2.jpg', '/images/f4_3.jpg'],
  f5: ['/images/f5_1.jpg', '/images/f5_2.jpg', '/images/f5_3.jpg'],
  f6: ['/images/f6_1.jpg', '/images/f6_2.jpg', '/images/f6_3.jpg'],
  f8: ['/images/f8_1.jpg', '/images/f8_2.jpg', '/images/f8_3.jpg'],
  f9: ['/images/f9_1.jpg', '/images/f9_2.jpg'],
  f10: ['/images/f10_1.jpg', '/images/f10_2.jpg', '/images/f10_3.jpg'],
  f11: ['/images/f11_1.jpg', '/images/f11_2.jpg', '/images/f11_3.jpg'],
  f12: ['/images/f12_1.jpg', '/images/f12_2.jpg', '/images/f12_3.jpg'],
  sh1: ['/images/sh1_1.jpg', '/images/sh1_2.jpg', '/images/sh1_3.jpg'],
  sh2: ['/images/sh2_1.jpg', '/images/sh2_2.jpg', '/images/sh2_3.jpg'],
  sh4: ['/images/sh4_1.jpg', '/images/sh4_2.jpg', '/images/sh4_3.jpg'],
  sh5: ['/images/sh5_1.jpg', '/images/sh5_2.jpg', '/images/sh5_3.jpg'],
  sh6: ['/images/sh6_1.jpg', '/images/sh6_2.jpg', '/images/sh6_3.jpg'],
  sh7: ['/images/sh7_1.jpg', '/images/sh7_2.jpg', '/images/sh7_3.jpg'],
  sh9: ['/images/sh9_1.jpg', '/images/sh9_2.jpg', '/images/sh9_3.jpg'],
  sh10: ['/images/sh10_1.jpg', '/images/sh10_2.jpg', '/images/sh10_3.jpg'],
  sh11: ['/images/sh11_1.jpg', '/images/sh11_2.jpg', '/images/sh11_3.jpg'],
  sh12: ['/images/sh12_1.jpg', '/images/sh12_2.jpg', '/images/sh12_3.jpg'],
  p1: ['/images/p1_1.jpg', '/images/p1_2.jpg', '/images/p1_3.jpg'],
  p3: ['/images/p3_1.jpg', '/images/p3_2.jpg', '/images/p3_3.jpg'],
  p6: ['/images/p6_1.jpg', '/images/p6_2.jpg', '/images/p6_3.jpg'],
  p8: ['/images/p8_1.jpg', '/images/p8_2.jpg', '/images/p8_3.jpg'],
  p9: ['/images/p9_1.jpg', '/images/p9_2.jpg', '/images/p9_3.jpg'],
  p10: ['/images/p10_1.jpg', '/images/p10_2.jpg', '/images/p10_3.jpg'],
  p11: ['/images/p11_1.jpg', '/images/p11_2.jpg', '/images/p11_3.jpg'],
  jiujie: ["/images/jiujie_1.jpg","/images/jiujie_2.jpg"],
  scampi: ["/images/scampi_1.jpg"],
  flower_lobster: ["/images/flower_lobster_1.jpg","/images/flower_lobster_2.jpg","/images/flower_lobster_3.jpg"],
  mozambique: ["/images/mozambique_1.jpg"],
  rock_shrimp: ["/images/rock_shrimp_1.jpg","/images/rock_shrimp_2.jpg"],
  river_prawn: ["/images/river_prawn_1.jpg","/images/river_prawn_2.jpg","/images/river_prawn_3.jpg"],
  glass_shrimp: ["/images/glass_shrimp_1.jpg","/images/glass_shrimp_2.jpg","/images/glass_shrimp_3.jpg"],
  gazami: ["/images/gazami_1.jpg"],
  spanner_crab: ["/images/spanner_crab_1.jpg","/images/spanner_crab_2.jpg"],
  blue_crab: ["/images/blue_crab_1.jpg","/images/blue_crab_2.jpg","/images/blue_crab_3.jpg"],
  stone_crab: ["/images/stone_crab_1.jpg","/images/stone_crab_2.jpg","/images/stone_crab_3.jpg"],       
  spider_crab: ["/images/spider_crab_1.jpg","/images/spider_crab_2.jpg","/images/spider_crab_3.jpg"],
  golden_crab: ["/images/golden_crab_1.jpg","/images/golden_crab_2.jpg"],
  leopard_grouper: ["/images/leopard_grouper_1.jpg","/images/leopard_grouper_2.jpg"],
  mandarin_fish: ["/images/mandarin_fish_1.jpg","/images/mandarin_fish_2.jpg"],
  monkfish: ["/images/monkfish_1.jpg","/images/monkfish_2.jpg"],
  eel: ["/images/eel_1.jpg","/images/eel_2.jpg"],
  mackerel: ["/images/mackerel_1.jpg","/images/mackerel_2.jpg"],
  pompano: ["/images/pompano_2.jpg"],
  crucian: ["/images/crucian_1.jpg","/images/crucian_2.jpg"],
  grass_carp: ["/images/grass_carp_2.jpg"],
  stingray: ["/images/stingray_1.jpg","/images/stingray_2.jpg"],
  basa: ["/images/basa_1.jpg","/images/basa_2.jpg","/images/basa_3.jpg"],
  barramundi: ["/images/barramundi_2.jpg"],
  bighead_carp: ["/images/bighead_carp_1.jpg","/images/bighead_carp_2.jpg"],
  mullet: ["/images/mullet_1.jpg"],
  threadfin: ["/images/threadfin_1.jpg","/images/threadfin_2.jpg"],
  abalone: ["/images/abalone_1.jpg","/images/abalone_2.jpg"],
  blood_clam: ["/images/blood_clam_1.jpg"],
  ark_shell: ["/images/ark_shell_1.jpg","/images/ark_shell_2.jpg","/images/ark_shell_3.jpg"],
  napoleon_fish: ["/images/napoleon_fish_1.jpg","/images/napoleon_fish_2.jpg"],
  australian_lobster: ["/images/australian_lobster_1.jpg","/images/australian_lobster_2.jpg"],
  puffer_fish: ["/images/puffer_fish_1.jpg","/images/puffer_fish_2.jpg"],
  green_abalone: ["/images/green_abalone_2.jpg"],
  lobster_fra: ["/images/lobster_fra_1.jpg","/images/lobster_fra_2.jpg"],
  ce1: ["/images/ce1_1.jpg","/images/ce1_3.jpg"],
  ce2: ["/images/ce2_1.jpg","/images/ce2_3.jpg"],
  ce3: ["/images/ce3_1.jpg"],
  ce4: ["/images/ce4_1.jpg","/images/ce4_3.jpg"],
  ce5: ["/images/ce5_1.jpg"],
  ce6: ["/images/ce6_1.jpg"],
  ec1: ["/images/ec1_1.jpg","/images/ec1_3.jpg"],
  ec2: ["/images/ec2_1.jpg","/images/ec2_3.jpg"],
  ec3: ["/images/ec3_1.jpg","/images/ec3_3.jpg"],
  ec4: ["/images/ec4_1.jpg","/images/ec4_3.jpg"],
  ec5: ["/images/ec5_1.jpg","/images/ec5_3.jpg"],
  al1: ["/images/al1_1.jpg","/images/al1_3.jpg"],
  al2: ["/images/al2_1.jpg","/images/al2_3.jpg"],
  al3: ["/images/al3_1.jpg","/images/al3_3.jpg"],
  al4: ["/images/al4_1.jpg","/images/al4_3.jpg"],
  al5: ["/images/al5_3.jpg"],
  al6: ["/images/al6_1.jpg"],
};

// removed old custom Badge
// 带图片错误回退和防盗链配置的图片组件
const ImageFallback = ({ src, alt, className }) => {
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted flex items-center justify-center", className)}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-1000 ease-out hover:scale-105"
          onError={() => setError(true)}
        />
      ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <span className="text-xs uppercase tracking-widest">暂无图片</span>
          </div>
      )}
    </div>
  );
};

// ==========================================
// 轮播图组件 (极简全屏大图风格)
// ==========================================
// ==========================================
// 轮播图组件 (极简全屏大图风格)
// ==========================================
const ImageCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-96 lg:h-[32rem] overflow-hidden group bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0"
        >
          <ImageFallback
            src={images[currentIndex]}
            alt={`${title} - 图${currentIndex + 1}`}
            className="w-full h-full object-cover opacity-90"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 opacity-0 group-hover:opacity-100 hover:text-white transition-all duration-300 disabled:opacity-0"
          >
            <ChevronRight className="w-8 h-8 rotate-180 font-light" strokeWidth={1} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 opacity-0 group-hover:opacity-100 hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-8 h-8 font-light" strokeWidth={1} />
          </button>

          <div className="absolute bottom-8 right-8 flex gap-3 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={cn(
                  "h-px transition-all duration-500",
                  currentIndex === idx ? "w-8 bg-white" : "w-4 bg-white/30 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ==========================================
// 3. 主应用组件
// ==========================================
export default function SeafoodPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname === '/venues' ? 'venues' : 'fish';
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeafood, setSelectedSeafood] = useState(null);

  const filteredData = useMemo(() => {
    let data = SEAFOOD_DATA;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.enName.toLowerCase().includes(q) ||
        item.tags.some(tag => tag.includes(q))
      );
    } else {
      data = data.filter(item => item.category === activeCategory);
    }
    return data;
  }, [searchQuery, activeCategory]);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background font-sans text-foreground">

      {/* 顶部极简导航区域 */}
      <header className="flex-shrink-0 z-40 w-full bg-background border-b border-border">
        <div className="px-6 md:px-10 h-16 flex items-center justify-between max-w-[1920px] mx-auto">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                海鲜 <span className="text-muted-foreground font-normal">图鉴</span>
              </h1>
            </div>
            {/* Switcher & Theme inside Header */}
            <div className="hidden md:flex items-center gap-4 ml-8">
              <div className="flex bg-muted rounded-md p-1">
                <button 
                  onClick={() => navigate('/fish')}
                  className={cn("px-4 py-1.5 rounded-sm text-sm font-medium transition-all", activePage === 'fish' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
                >
                  海鲜
                </button>
                <button 
                  onClick={() => navigate('/venues')}
                  className={cn("px-4 py-1.5 rounded-sm text-sm font-medium transition-all", activePage === 'venues' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
                >
                  场馆
                </button>
              </div>
              <ThemeToggle />
            </div>
          </div>

          <div className="relative w-64 md:w-96 group">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedSeafood(null);
              }}
              className="w-full h-9 bg-muted/50 border border-input rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
            />
            {searchQuery ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSeafood(null);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors mr-3"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </header>

      {/* 主体三列结构：剔除圆角阴影框，全黑底+极细白线分割 */}
      <main className="flex-1 flex overflow-hidden max-w-[1920px] mx-auto w-full">

        {/* === 第一列：左侧目录分类 === */}
        <aside className="w-20 md:w-72 flex-shrink-0 flex flex-col pt-6 border-r border-border relative bg-muted/10">
          <div className="px-6 mb-6 hidden md:block">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">目录大类</h3>
          </div>

          <ScrollArea className="flex-1 w-full">
              <div className="flex flex-col gap-1 p-2">
                {CATEGORIES.map(category => {
                  const isActive = activeCategory === category.id && !searchQuery;
                  return (
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        onClick={() => {
                          setActiveCategory(category.id);
                          setSearchQuery('');
                          setSelectedSeafood(null);
                        }}
                        className={cn(
                          "w-full justify-start h-14 md:h-12 px-6 relative group transition-all",
                          isActive ? "font-bold text-primary" : "text-muted-foreground"
                        )}
                      >
                        {isActive && (
                          <motion.div layoutId="navline" className="absolute left-0 top-1 bottom-1 w-1 bg-primary rounded-r-md" />
                        )}
                        <span className="hidden md:block text-sm font-medium">
                          {category.name}
                        </span>
                        <span className="md:hidden text-xl">
                          {category.icon}
                        </span>
                      </Button>
                  )
                })}
              </div>
            </ScrollArea>
        </aside>

        {/* === 第二列：中间项目列表 (Index Style) === */}
        <section className="w-[340px] md:w-[420px] flex-shrink-0 flex flex-col border-r border-border bg-background relative">
          <div className="h-14 flex items-center justify-between px-6 border-b border-border">
            <span className="text-sm font-medium text-muted-foreground">
              {searchQuery ? '搜索结果' : '全部分类'}
            </span>
            <span className="text-sm text-muted-foreground">
              {filteredData.length} 种海鲜
            </span>
          </div>

          <ScrollArea className="flex-1 w-full">
              <div className="flex flex-col space-y-1 p-3">
                <AnimatePresence mode="popLayout">
                  {filteredData.map(item => {
                    const isSelected = selectedSeafood?.id === item.id;
                    return (
                      <Card
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedSeafood(item)}
                        className={cn(
                          "group cursor-pointer flex gap-4 items-center p-3 transition-all hover:bg-accent hover:text-accent-foreground",
                          isSelected ? "bg-accent border-primary ring-1 ring-primary" : ""
                        )}
                      >
                        <ImageFallback
                          src={(LOCAL_IMAGE_MAP[item.id] || [])[0] || item.baikeImg}
                          alt={item.name}
                          className="w-20 h-24 shrink-0 rounded-md transition-all group-hover:scale-105"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h3 className="text-sm font-semibold truncate text-foreground">
                            {item.name}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {item.enName}
                          </p>
                          <div className="mt-2">
                            <Badge variant={isSelected ? "default" : "secondary"} className="text-[10px] uppercase font-normal py-0">
                              {item.price.split(' / ')[1] || 'PRICE'}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </AnimatePresence>

                {filteredData.length === 0 && (
                  <div className="p-10 text-center text-[#444] text-xs uppercase tracking-widest mt-20">
                    No records found.
                  </div>
                )}
              </div>
            </ScrollArea>
        </section>

        {/* === 第三列：右侧极简排版详情 === */}
        <section className="flex-1 bg-background relative overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {selectedSeafood ? (
              <motion.div
                key={selectedSeafood.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col h-full absolute inset-0"
              >
                <ScrollArea className="h-full w-full">
                    {/* 满屏大图 */}
                    <div className="relative">
                      <ImageCarousel
                        images={LOCAL_IMAGE_MAP[selectedSeafood.id] || [selectedSeafood.baikeImg]}
                        title={selectedSeafood.name}
                      />
                    </div>

                    {/* 详情正文区 */}
                    <CardContent className="px-10 md:px-14 pt-10 pb-32 max-w-4xl space-y-0 border-0 shadow-none bg-transparent">

                      {/* 名称 + 价格标签行 */}
                      <div className="mb-10 pb-8">
                        {/* 品类名称 */}
                        <div className="mb-6">
                          <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
                            {selectedSeafood.name}
                          </h2>
                          <p className="text-xl text-muted-foreground italic font-light">
                            {selectedSeafood.enName}
                          </p>
                        </div>
                        {/* 标签 */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedSeafood.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs uppercase tracking-widest">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {/* 价格 */}
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">市场参考价</p>
                          <div className="text-2xl font-semibold text-primary tracking-tight">
                            {selectedSeafood.price}
                          </div>
                        </div>
                      </div>

                      <Separator className="mb-8" />

                      {/* 四板块 */}
                      <div className="grid grid-cols-1 gap-12">

                        {/* 1. 品种特征解剖 */}
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                            品种特征解剖
                          </h4>
                          <p className="text-foreground text-lg leading-7 group-hover:text-primary transition-colors">
                            {selectedSeafood.features}
                          </p>
                        </div>

                        <Separator />

                        {/* 2. 口感分析 */}
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                            口感分析
                          </h4>
                          <blockquote className="mt-2 border-l-2 border-primary pl-6 italic text-xl text-muted-foreground">
                            "{selectedSeafood.texture}"
                          </blockquote>
                        </div>

                        <Separator />

                        {/* 3. 做法推荐 */}
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-5">
                            做法推荐
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {selectedSeafood.cooking.split('、').map((method, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="px-4 py-1.5 text-sm font-medium tracking-wide uppercase"
                              >
                                {method.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* 4. 选购理由 */}
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                            选购理由
                          </h4>
                          <p className="text-foreground text-lg leading-7">
                            {selectedSeafood.pros}
                          </p>
                        </div>

                      </div>
                    </CardContent>
                </ScrollArea>
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 absolute inset-0"
              >
                <div className="w-px h-24 bg-border mb-8" />
                <h3 className="text-4xl text-muted-foreground font-bold tracking-tight">海鲜图鉴</h3>
                <p className="text-sm text-muted-foreground mt-4">
                  从目录中选择一项以浏览详细信息。
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </main>
    </div>
  );
}

