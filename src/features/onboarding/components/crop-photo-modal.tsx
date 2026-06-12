'use client';

import { ImageIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

const CROP_SIZE = 240;
const OUTPUT_SIZE = 300;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

interface CropPhotoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Image to crop (object URL or data URL). */
  src: string | null;
  /** Receives the cropped square image as a data URL. */
  onSave: (dataUrl: string) => void;
}

/** Circular avatar cropper with drag-to-reposition and a zoom slider. */
export function CropPhotoModal({
  open,
  onOpenChange,
  src,
  onSave,
}: CropPhotoModalProps) {
  const [zoom, setZoom] = React.useState(1);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [nat, setNat] = React.useState<{ w: number; h: number } | null>(null);
  const [lastSrc, setLastSrc] = React.useState(src);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const dragRef = React.useRef<{
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  } | null>(null);

  // Reset transform whenever a new image is loaded (render-time state sync).
  if (src !== lastSrc) {
    setLastSrc(src);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setNat(null);
  }

  // Displayed image size: cover the crop box, then apply zoom.
  const cover = nat ? Math.max(CROP_SIZE / nat.w, CROP_SIZE / nat.h) : 1;
  const dispW = (nat ? nat.w * cover : CROP_SIZE) * zoom;
  const dispH = (nat ? nat.h * cover : CROP_SIZE) * zoom;
  const maxX = Math.max(0, (dispW - CROP_SIZE) / 2);
  const maxY = Math.max(0, (dispH - CROP_SIZE) / 2);
  const x = clamp(offset.x, -maxX, maxX);
  const y = clamp(offset.y, -maxY, maxY);

  function handleZoom(next: number) {
    const nextDispW = (nat ? nat.w * cover : CROP_SIZE) * next;
    const nextDispH = (nat ? nat.h * cover : CROP_SIZE) * next;
    const nextMaxX = Math.max(0, (nextDispW - CROP_SIZE) / 2);
    const nextMaxY = Math.max(0, (nextDispH - CROP_SIZE) / 2);
    setOffset(o => ({
      x: clamp(o.x, -nextMaxX, nextMaxX),
      y: clamp(o.y, -nextMaxY, nextMaxY),
    }));
    setZoom(next);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!src) return;
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      baseX: x,
      baseY: y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    setOffset({
      x: clamp(drag.baseX + (event.clientX - drag.startX), -maxX, maxX),
      y: clamp(drag.baseY + (event.clientY - drag.startY), -maxY, maxY),
    });
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleSave() {
    const img = imgRef.current;
    if (!img || !src) return;

    const canvas = document.createElement('canvas');
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Map the on-screen (display) transform onto the output canvas.
    const scale = OUTPUT_SIZE / CROP_SIZE;
    const drawW = dispW * scale;
    const drawH = dispH * scale;
    ctx.drawImage(
      img,
      (OUTPUT_SIZE - drawW) / 2 + x * scale,
      (OUTPUT_SIZE - drawH) / 2 + y * scale,
      drawW,
      drawH
    );

    onSave(canvas.toDataURL('image/png'));
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className='flex w-full max-w-[464px] flex-col items-center gap-8 rounded-2xl border-[#3a4a47] bg-[#182120] p-8 shadow-[0px_3px_1px_rgba(46,237,170,0.06),0px_5px_1.5px_rgba(46,237,170,0.02)]'
      >
        <div className='flex flex-col items-center gap-1 text-center'>
          <DialogTitle className='font-heading text-h4 leading-[1.2] font-semibold text-white'>
            Crop your photo
          </DialogTitle>
          <DialogDescription className='max-w-[266px] text-body-sm text-[#808080]'>
            For best results, use a PNG, JPG, or GIF image at least 300 x 300
            px.
          </DialogDescription>
        </div>

        <div className='flex w-full flex-col items-center gap-5'>
          <div
            className='relative size-60 touch-none overflow-hidden rounded-[14.4px] bg-white select-none'
            style={{ cursor: src ? 'grab' : 'default' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={imgRef}
                src={src}
                alt=''
                onLoad={event =>
                  setNat({
                    w: event.currentTarget.naturalWidth,
                    h: event.currentTarget.naturalHeight,
                  })
                }
                className='pointer-events-none absolute top-1/2 left-1/2 max-w-none select-none'
                style={{
                  width: dispW,
                  height: dispH,
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
                draggable={false}
              />
            ) : null}
            {/* Darken everything outside the centered circle. */}
            <div className='pointer-events-none absolute top-1/2 left-1/2 size-60 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_0_9999px_rgba(0,0,0,0.4)] ring-1 ring-white/30' />
          </div>

          <div className='flex w-full max-w-[196px] items-center gap-1'>
            <ImageIcon className='size-4 shrink-0 text-neutral-400' />
            <input
              type='range'
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={event => handleZoom(Number(event.target.value))}
              aria-label='Zoom'
              className='h-1 flex-1 cursor-pointer appearance-none rounded-full bg-[#2e3a38] accent-primary-500'
            />
            <ImageIcon className='size-6 shrink-0 text-neutral-400' />
          </div>
        </div>

        <div className='flex w-full items-center justify-center gap-3'>
          <Button
            intent='secondary'
            appearance='outline'
            shape='pill'
            size='small'
            className='w-[120px]'
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            intent='primary'
            shape='pill'
            size='small'
            className='w-[120px]'
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
