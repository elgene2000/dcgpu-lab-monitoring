import ClientTemperature from "@/components/client-temperature";

export default async function TemperatureSensor({
  params,
}: {
  params: Promise<{ sensor: string }>;
}) {
  const { sensor } = await params;

  return <ClientTemperature datahall="dh5" site="odcdh5" location={sensor} />;
}

