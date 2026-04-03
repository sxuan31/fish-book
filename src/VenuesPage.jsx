import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, ChevronRight, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LiquidEther from '@/components/ui/liquid-ether';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/theme-toggle';
import { useNavigate, useLocation } from 'react-router-dom';

import { VENUE_CATEGORIES, VENUES_DATA } from './venuesData';
import { cn } from "@/lib/utils";

// 带图片错误回退和防盗链配置的图片组件
const ImageFallback = ({ src, alt, className }) => {
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted flex items-center justify-center", className)}>
      {!error && src ? (
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

  // Reset index when images array changes
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  if (!images || images.length === 0) return null;

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

// 这里以后从爬虫结果引入，暂时为空对象
export const VENUE_IMAGE_MAP = {
  bj1: ['/images/venues/bj1_2.jpg'],
  bj2: ['/images/venues/bj2_1.jpg', '/images/venues/bj2_3.jpg'],
  bj3: ['/images/venues/bj3_1.jpg', '/images/venues/bj3_2.jpg'],
  bj4: ['/images/venues/bj4_1.jpg', '/images/venues/bj4_3.jpg'],
  bj5: ['/images/venues/bj5_2.jpg'],
  bj6: [], // Removed incorrect Bird's Nest images
  bj7: ['/images/venues/bj7_1.jpg', '/images/venues/bj7_2.jpg', '/images/venues/bj7_3.jpg'],
  cd1: ['/images/venues/cd1_2.jpg', '/images/venues/cd1_3.jpg'],
  cd2: ['/images/venues/cd2_1.jpg', '/images/venues/cd2_2.jpg'],
  cq1: ['/images/venues/cq1_2.jpg', '/images/venues/cq1_3.jpg'],
  cq2: ['/images/venues/cq2_1.jpg', '/images/venues/cq2_3.jpg'],
  cq3: ['/images/venues/cq3_1.jpg', '/images/venues/cq3_3.jpg'],
  cs2: ['/images/venues/cs2_1.jpg', '/images/venues/cs2_2.jpg', '/images/venues/cs2_3.jpg'],
  cs3: ['/images/venues/cs3_1.jpg', '/images/venues/cs3_2.jpg', '/images/venues/cs3_3.jpg'],
  dg1: ['/images/venues/dg1_2.jpg'],
  dl2: ['/images/venues/dl2_1.jpg', '/images/venues/dl2_2.jpg'],
  dl3: ['/images/venues/dl3_2.jpg', '/images/venues/dl3_3.jpg'],
  fz1: ['/images/venues/fz1_1.jpg', '/images/venues/fz1_3.jpg'],
  gy1: ['/images/venues/gy1_1.jpg', '/images/venues/gy1_2.jpg', '/images/venues/gy1_3.jpg'],
  gz1: ['/images/venues/gz1_1.jpg', '/images/venues/gz1_2.jpg', '/images/venues/gz1_3.jpg'],
  gz2: ['/images/venues/gz2_1.jpg'],
  gz3: ['/images/venues/gz3_1.jpg', '/images/venues/gz3_2.jpg', '/images/venues/gz3_3.jpg'],
  gz4: ['/images/venues/gz4_1.jpg', '/images/venues/gz4_2.jpg', '/images/venues/gz4_3.jpg'],
  gz5: ['/images/venues/gz5_1.jpg', '/images/venues/gz5_2.jpg', '/images/venues/gz5_3.jpg'],
  gz6: ['/images/venues/gz6_1.jpg', '/images/venues/gz6_2.jpg', '/images/venues/gz6_3.jpg'],
  gz7: ['/images/venues/gz7_3.jpg'],
  hf1: ['/images/venues/hf1_1.jpg', '/images/venues/hf1_2.jpg', '/images/venues/hf1_3.jpg'],
  hrb1: ['/images/venues/hrb1_1.jpg', '/images/venues/hrb1_2.jpg', '/images/venues/hrb1_3.jpg'],
  hz1: ['/images/venues/hz1_1.jpg', '/images/venues/hz1_2.jpg', '/images/venues/hz1_3.jpg'],
  hz2: ['/images/venues/hz2_1.jpg', '/images/venues/hz2_2.jpg'],
  hz3: ['/images/venues/hz3_1.jpg'],
  jn1: ['/images/venues/jn1_1.jpg', '/images/venues/jn1_2.jpg', '/images/venues/jn1_3.jpg'],
  jn2: ['/images/venues/jn2_2.jpg', '/images/venues/jn2_3.jpg'],
  km1: ['/images/venues/km1_3.jpg'],
  nc1: ['/images/venues/nc1_1.jpg', '/images/venues/nc1_2.jpg', '/images/venues/nc1_3.jpg'],
  nj1: ['/images/venues/nj1_1.jpg', '/images/venues/nj1_2.jpg', '/images/venues/nj1_3.jpg'],
  nj3: ['/images/venues/nj3_1.jpg', '/images/venues/nj3_2.jpg', '/images/venues/nj3_3.jpg'],
  nn1: ['/images/venues/nn1_1.jpg', '/images/venues/nn1_3.jpg'],
  qd1: ['/images/venues/qd1_2.jpg', '/images/venues/qd1_3.jpg'],
  sh1: ['/images/venues/sh1_1.jpg', '/images/venues/sh1_2.jpg', '/images/venues/sh1_3.jpg'],
  sh2: ['/images/venues/sh2_2.jpg', '/images/venues/sh2_3.jpg'],
  sh3: ['/images/venues/sh3_3.jpg'],
  sh4: ['/images/venues/sh4_1.jpg', '/images/venues/sh4_2.jpg', '/images/venues/sh4_3.jpg'],
  sh5: ['/images/venues/sh5_2.jpg', '/images/venues/sh5_3.jpg'],
  sh6: ['/images/venues/sh6_1.jpg', '/images/venues/sh6_2.jpg', '/images/venues/sh6_3.jpg'],
  sh7: ['/images/venues/sh7_1.jpg', '/images/venues/sh7_2.jpg', '/images/venues/sh7_3.jpg'],
  su1: ['/images/venues/su1_1.jpg', '/images/venues/su1_2.jpg', '/images/venues/su1_3.jpg'],
  sy1: ['/images/venues/sy1_1.jpg', '/images/venues/sy1_2.jpg', '/images/venues/sy1_3.jpg'],
  sz1: ['/images/venues/sz1_1.jpg', '/images/venues/sz1_2.jpg', '/images/venues/sz1_3.jpg'],
  sz2: ['/images/venues/sz2_1.jpg', '/images/venues/sz2_3.jpg'],
  sz3: ['/images/venues/sz3_1.jpg'],
  sz4: ['/images/venues/sz4_1.jpg', '/images/venues/sz4_2.jpg', '/images/venues/sz4_3.jpg'],
  sz5: ['/images/venues/sz5_1.jpg', '/images/venues/sz5_2.jpg'],
  tj1: ['/images/venues/tj1_1.jpg', '/images/venues/tj1_3.jpg'],
  tj2: ['/images/venues/tj2_1.jpg'],
  tj3: ['/images/venues/tj3_2.jpg', '/images/venues/tj3_3.jpg'],
  wh1: ['/images/venues/wh1_1.jpg', '/images/venues/wh1_2.jpg'],
  wh2: ['/images/venues/wh2_2.jpg', '/images/venues/wh2_3.jpg'],
  wh3: ['/images/venues/wh3_3.jpg'],
  xa2: ['/images/venues/xa2_1.jpg', '/images/venues/xa2_2.jpg', '/images/venues/xa2_3.jpg'],
  xa3: ['/images/venues/xa3_2.jpg', '/images/venues/xa3_3.jpg'],
  xm1: ['/images/venues/xm1_1.jpg', '/images/venues/xm1_3.jpg'],
  xm2: ['/images/venues/xm2_1.jpg', '/images/venues/xm2_2.jpg', '/images/venues/xm2_3.jpg'],
  zz1: ['/images/venues/zz1_2.jpg'],
  zz2: ['/images/venues/zz2_2.jpg'],
};

export default function VenuesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname === '/fish' ? 'fish' : 'venues';
  const [activeCategory, setActiveCategory] = useState(VENUE_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVenue, setSelectedVenue] = useState(null);
  // mobile: 'categories' | 'list' | 'detail'
  const [mobileView, setMobileView] = useState('categories');

  const filteredData = useMemo(() => {
    let data = VENUES_DATA;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.enName.toLowerCase().includes(q) ||
        item.tags.some(tag => tag.includes(q)) ||
        item.city.includes(q)
      );
    } else {
      data = data.filter(item => item.city === activeCategory);
    }
    return data;
  }, [searchQuery, activeCategory]);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background font-sans text-foreground relative">
      {/* LiquidEther 背景层 */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen">
        <LiquidEther />
      </div>

      <div className="absolute inset-0 z-0 bg-background/60 backdrop-blur-sm pointer-events-none" />

      {/* 顶部导航区域 */}
      <header className="flex-shrink-0 z-40 w-full bg-background/70 backdrop-blur-lg border-b border-border/50 relative">
        <div className="px-4 md:px-6 lg:px-10 h-14 md:h-16 flex items-center justify-between max-w-[1920px] mx-auto">
          <div className="flex items-center gap-4 md:gap-6">
            {/* Mobile back buttons */}
            {mobileView === 'list' && (
              <Button variant="ghost" size="sm" onClick={() => setMobileView('categories')} className="md:hidden flex items-center gap-1 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>城市</span>
              </Button>
            )}
            {mobileView === 'detail' && (
              <Button variant="ghost" size="sm" onClick={() => { setSelectedVenue(null); setMobileView('list'); }} className="md:hidden flex items-center gap-1 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>列表</span>
              </Button>
            )}
            {mobileView === 'categories' && (
              <div className="md:hidden">
                <h1 className="text-base font-bold tracking-tight">世界场馆 <span className="text-muted-foreground font-normal">档案</span></h1>
              </div>
            )}
            <div className="hidden md:block">
              <h1 className="text-xl font-bold tracking-tight">
                世界场馆 <span className="text-muted-foreground font-normal">档案</span>
              </h1>
            </div>
            {/* Switcher & Theme - desktop only */}
            <div className="hidden md:flex items-center gap-4 ml-8">
              <Tabs value={activePage} onValueChange={(v) => navigate(`/${v}`)}>
                <TabsList className="bg-muted/50 backdrop-blur-md">
                  <TabsTrigger value="fish">海鲜</TabsTrigger>
                  <TabsTrigger value="venues">场馆</TabsTrigger>
                </TabsList>
              </Tabs>
              <ThemeToggle />
            </div>
          </div>

          <div className="relative w-40 sm:w-56 md:w-96 group">
            <Input
              type="text"
              placeholder="搜索场馆..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedVenue(null);
                if (e.target.value) setMobileView('list');
              }}
              className="w-full pl-3 pr-8 bg-muted/50 transition-colors border-border/50"
            />
            {searchQuery ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedVenue(null);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground mr-0.5"
              >
                <X className="w-4 h-4" />
              </Button>
            ) : (
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </header>

      {/* 主体三列结构 */}
      <main className="flex-1 flex overflow-hidden max-w-[1920px] mx-auto w-full">

        {/* === 第一列：左侧目录分类 === */}
        <aside className={cn(
          "flex-shrink-0 flex flex-col pt-4 md:pt-6 border-r border-border/50 relative bg-background/40 backdrop-blur-md",
          "w-full md:w-72",
          mobileView === 'categories' ? "flex md:flex" : "hidden md:flex"
        )}>
          <div className="px-6 mb-6 hidden md:block">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">所在城市</h3>
          </div>

          <ScrollArea className="flex-1 w-full">
              <div className="flex flex-col gap-1 p-2">
                {VENUE_CATEGORIES.map(category => {
                  const isActive = activeCategory === category.id && !searchQuery;
                  return (
                      <Button
                        key={category.id}
                        variant={isActive ? "secondary" : "ghost"}
                        onClick={() => {
                          setActiveCategory(category.id);
                          setSearchQuery('');
                          setSelectedVenue(null);
                          setMobileView('list');
                        }}
                        className={cn(
                          "w-full justify-start h-14 md:h-12 px-4 md:px-6 relative group transition-all",
                          isActive ? "font-bold text-primary" : "text-muted-foreground"
                        )}
                      >
                        {isActive && (
                          <motion.div layoutId="navline_venues" className="absolute left-0 top-1 bottom-1 w-1 bg-primary rounded-r-md" />
                        )}
                        <span className="text-sm font-medium flex items-center gap-3">
                          <span className="text-xl">{category.icon}</span>
                          <span>{category.name}</span>
                          <ChevronRight className="ml-auto w-4 h-4 text-muted-foreground md:hidden" />
                        </span>
                      </Button>
                  )
                })}
              </div>
            </ScrollArea>
        </aside>

        {/* === 第二列：中间项目列表 === */}
        <section className={cn(
          "flex-shrink-0 flex flex-col border-r border-border/50 bg-background/50 backdrop-blur-xl relative",
          "w-full md:w-[420px]",
          mobileView === 'list' ? "flex md:flex" : "hidden md:flex"
        )}>
          <div className="h-14 flex items-center justify-between px-6 border-b border-border">
            <span className="text-sm font-medium text-muted-foreground">
              {searchQuery ? '搜索结果' : '所有场馆'}
            </span>
            <span className="text-sm text-muted-foreground">
              {filteredData.length} 座场馆
            </span>
          </div>

          <ScrollArea className="flex-1 w-full">
              <div className="flex flex-col space-y-1 p-3">
                <AnimatePresence mode="popLayout">
                  {filteredData.map((item, idx) => {
                    const isSelected = selectedVenue?.id === item.id;
                    return (
                      <Card
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                          setSelectedVenue(item);
                          setMobileView('detail');
                        }}
                        className={cn(
                          "group cursor-pointer flex flex-row gap-4 items-center p-3 transition-all hover:bg-accent hover:text-accent-foreground",
                          isSelected ? "bg-accent border-primary ring-1 ring-primary" : ""
                        )}
                      >
                        <ImageFallback
                          src={(VENUE_IMAGE_MAP[item.id] || [])[0] || item.baikeImg}
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
                          <div className="mt-2 flex gap-2">
                            <Badge variant={item.status === 'under_construction' ? "destructive" : (isSelected ? "default" : "secondary")} className="text-[10px] uppercase font-normal py-0">
                              {item.status === 'under_construction' ? '★在建' : '开放'}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] uppercase">
                              {item.type}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </AnimatePresence>

                {filteredData.length === 0 && (
                  <div className="p-10 text-center text-muted-foreground text-xs uppercase tracking-widest mt-20">
                    未找到相关场馆
                  </div>
                )}
              </div>
            </ScrollArea>
        </section>

        {/* === 第三列：右侧详情 === */}
        <section className={cn(
          "flex-1 bg-background/50 backdrop-blur-2xl relative overflow-hidden flex flex-col",
          mobileView === 'detail' ? "flex md:flex" : "hidden md:flex"
        )}>
          <AnimatePresence mode="wait">
            {selectedVenue ? (
              <motion.div
                key={selectedVenue.id}
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
                        images={VENUE_IMAGE_MAP[selectedVenue.id]?.length > 0 ? VENUE_IMAGE_MAP[selectedVenue.id] : [selectedVenue.baikeImg]}
                        title={selectedVenue.name}
                      />
                    </div>

                    {/* 详情正文区 */}
                    <CardContent className="px-10 md:px-14 pt-10 pb-32 max-w-4xl space-y-0 border-0 shadow-none bg-transparent">

                      {/* 名称 + 基本规格标签行 */}
                      <div className="mb-10 pb-8">
                        <div className="mb-6">
                          <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 flex items-center gap-4">
                            {selectedVenue.name}
                            {selectedVenue.status === 'under_construction' && (
                              <Badge variant="destructive" className="align-middle">工程在建</Badge>
                            )}
                          </h2>
                          <p className="text-xl text-muted-foreground italic font-light flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-muted-foreground" /> {selectedVenue.city.toUpperCase()} | {selectedVenue.enName}
                          </p>
                        </div>
                        
                        {/* 标签 */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedVenue.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs uppercase tracking-widest">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* 规格四宫格 */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">座位容量</p>
                            <div className="text-2xl font-semibold text-primary tracking-tight flex items-end gap-2">
                              {selectedVenue.capacity.toLocaleString()} 座
                            </div>
                            {selectedVenue.capacityNote && (
                              <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{selectedVenue.capacityNote}</p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">场馆类型</p>
                            <div className="text-2xl font-semibold text-foreground tracking-tight">
                              {selectedVenue.type}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">建成年份</p>
                            <div className="text-2xl font-semibold text-foreground tracking-tight">
                              {selectedVenue.opened}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="mb-8" />

                      {/* 三大板块 */}
                      <div className="grid grid-cols-1 gap-12">

                        {/* 1. 历史简介 */}
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                            场馆历史与特色
                          </h4>
                          <p className="text-foreground text-lg leading-7">
                            {selectedVenue.history}
                          </p>
                        </div>

                        <Separator />

                        {/* 2. 常驻/特色赛事类型 */}
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-5">
                            核心用途领域
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {selectedVenue.events.split('、').map((method, i) => (
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

                        {/* 3. 知名赛事/演出里程碑 */}
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
                            里程碑级赛事与演出
                          </h4>
                          <ul className="space-y-4">
                            {selectedVenue.notableEvents.map((evt, j) => (
                              <li key={j} className="flex gap-4 items-start">
                                <span className="text-primary mt-1 font-bold">●</span>
                                <span className="text-muted-foreground text-xl font-light italic tracking-wide">{evt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    </CardContent>
                </ScrollArea>
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="h-full flex flex-col items-center justify-center text-center p-8 absolute inset-0"
              >
                <div className="w-px h-24 bg-border mb-8" />
                <h3 className="text-4xl text-muted-foreground font-bold tracking-tight">世界场馆 <span className="text-primary font-normal">档案</span></h3>
                <p className="text-sm text-muted-foreground mt-4">
                  从目录中选择一座场馆以浏览详细信息。
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </main>

      {/* 移动端底栏导航 */}
      <footer className="md:hidden flex-shrink-0 h-16 border-t border-border bg-background/80 backdrop-blur-md flex items-center justify-around px-6 z-50">
        <button 
          onClick={() => navigate('/fish')}
          className={cn("flex flex-col items-center gap-1 transition-colors", activePage === 'fish' ? "text-primary" : "text-muted-foreground")}
        >
          <div className={cn("p-1 rounded-md transition-colors", activePage === 'fish' ? "bg-primary/10" : "")}>
            <span className="text-xl">🐟</span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-widest">海鲜</span>
        </button>
        <button 
          onClick={() => navigate('/venues')}
          className={cn("flex flex-col items-center gap-1 transition-colors", activePage === 'venues' ? "text-primary" : "text-muted-foreground")}
        >
          <div className={cn("p-1 rounded-md transition-colors", activePage === 'venues' ? "bg-primary/10" : "")}>
            <span className="text-xl">🏟️</span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-widest">场馆</span>
        </button>
        <div className="h-8 w-px bg-border mx-2" />
        <ThemeToggle />
      </footer>
    </div>
  );
}
