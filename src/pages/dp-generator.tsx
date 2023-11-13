import { useRouter } from "next/navigation";
import { dpGeneratorURL } from "@/utils/urls";

export const DpGenerator = () => {
    const router = useRouter();
  
    React.useEffect(() => {
      router.replace("dpGeneratorURL");
    }, [router]);
  
    return <div></div>;
  };