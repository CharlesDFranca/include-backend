export type TimeInterval = {
  start: string;
  end: string;
};

export class Availability {
  private readonly availability: Record<string, TimeInterval[]>;

  constructor(availability: Record<string, TimeInterval[]>) {
    this.availability = availability;
  }

  isAvailable(day: string, time: string): boolean {
    const dayAvailability = this.availability[day];

    if (!dayAvailability) {
      return false;
    }

    return dayAvailability.some((interval) => time >= interval.start && time <= interval.end);
  }

  getAvailability(): Record<string, TimeInterval[]> {
    return this.availability;
  }
}
