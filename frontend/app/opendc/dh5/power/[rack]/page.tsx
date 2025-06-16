import ClientPowerRack from "@/components/ClientPowerRack";

export default async function PowerRack({
  params,
}: {
  params: Promise<{ rack: string }>;
}) {
  const { rack } = await params;

  return <ClientPowerRack datahall="dh5" site="odcdh5" rack={rack} />;
}
