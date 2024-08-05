import Image from 'next/image';


const CompanyImage = ({ companyName }) => {
  const imagePath = `/${companyName}.png`;

  // Intentar cargar la imagen específica de la empresa
  try {
    return <Image src={imagePath} width={50} height={50} alt={companyName}/>;
  } catch (e) {
    // Si no existe la imagen, cargar una imagen estándar
    return <Image src="/public/logoverde.png" width={150} height={150} alt="Default Image" />;
  }
};

export default CompanyImage;