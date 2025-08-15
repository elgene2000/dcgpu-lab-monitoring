import ClientPowerRack from "@/components/client-power-rack";

export default async function PowerRack({
  params,
}: {
  params: Promise<{ rack: string }>;
}) {
  const { rack } = await params;

  return <ClientPowerRack datahall="dh2" site="odcdh2" rack={rack} />;
} 