import ClientPowerRack from "@/components/client-power-rack";
import ClientTemperature from "@/components/client-temperature";

export default async function PowerRack({
  params,
}: {
  params: Promise<{ sensor: string }>;
}) {
  const { sensor } = await params;

  return <ClientTemperature datahall="dh3" site="odcdh3" location={sensor} />;
}
