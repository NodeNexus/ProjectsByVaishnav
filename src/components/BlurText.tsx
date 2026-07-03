import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
}

export function BlurText({ text, className }: BlurTextProps) {
  const words = text.split(' ');

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        rowGap: '0.1em',
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: index * 0.1 }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
