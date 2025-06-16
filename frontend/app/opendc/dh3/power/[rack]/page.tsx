import ClientPowerRack from "@/components/ClientPowerRack";

export default async function PowerRack({
  params,
}: {
  params: Promise<{ rack: string }>;
}) {
  const { rack } = await params;

  return <ClientPowerRack datahall="dh3" site="odcdh3" rack={rack} />;
}
