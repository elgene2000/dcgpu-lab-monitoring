import ClientTemperature from "@/components/client-temperature";

export default async function TemperatureSensor({
  params,
}: {
  params: Promise<{ sensor: string }>;
}) {
  const { sensor } = await params;

  return <ClientTemperature datahall="dh1" site="odcdh1" location={sensor} />;
}

