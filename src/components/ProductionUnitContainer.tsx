import './ProductionUnitContainer.css';

interface ProductionUnitContainerProps {
  bgColor?: string;
  children: React.ReactNode;
  height?: string;
}
export const ProductionUnitContainer = ({
  bgColor = '#fff',
  children,
  height,
}: ProductionUnitContainerProps) => {
  return (
    <div className="production-unit-container-box" style={{ backgroundColor: bgColor, height }}>
      {children}
    </div>
  );
};
