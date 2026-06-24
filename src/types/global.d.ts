// Global type declarations
declare module '*.jpg' {
  const value: string
  export default value
}

declare module '*.png' {
  const value: string
  export default value
}

declare module '*.svg' {
  const value: string
  export default value
}

// Tawk.to type declarations
interface Window {
  Tawk_API?: {
    toggle?: () => void;
    setAttributes?: (attributes: Record<string, any>, callback?: (error: any) => void) => void;
  }
}

declare module 'lucide-react' {
  import { FC, SVGProps } from 'react'
  
  interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: number | string
    color?: string
    strokeWidth?: number
    absoluteStrokeWidth?: boolean
  }
  
  export const Heart: FC<LucideProps>
  export const Lock: FC<LucideProps>
  export const AlertCircle: FC<LucideProps>
  export const Phone: FC<LucideProps>
  export const Mail: FC<LucideProps>
  export const Clock: FC<LucideProps>
  export const ArrowRight: FC<LucideProps>
  // Add any other icons you need here
}
