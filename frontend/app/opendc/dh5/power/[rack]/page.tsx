import ClientPowerRack from "@/components/client-power-rack";

export default async function PowerRack({
  params,
}: {
  params: Promise<{ rack: string }>;
}) {
  const { rack } = await params;

  return <ClientPowerRack datahall="dh5" site="odcdh5" rack={rack} />;
}
