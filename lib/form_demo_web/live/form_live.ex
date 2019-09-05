defmodule FormDemoWeb.FormLive do
  use Phoenix.LiveView

  def render(assigns) do
    FormDemoWeb.FormView.render("index.html", assigns)
  end

  def mount(_session, socket) do
    {:ok, assign(socket, filters: %{})}
  end

  def handle_event("filters_changed", params, socket) do
    filters = params["filters"] || %{}
    IO.inspect(filters, label: "filters_changed")
    {:noreply, assign(socket, filters: filters)}
  end
end
