"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/** next/image with a calm navy fallback so a missing remote photo never breaks the layout. */
export function SafeImage({ alt, className = "", ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-gradient-to-br from-navy-light via-navy to-navy ${className}`}
        style={props.fill ? { position: "absolute", inset: 0 } : undefined}
      />
    );
  }
  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
